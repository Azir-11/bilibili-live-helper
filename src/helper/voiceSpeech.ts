import { listen } from "@tauri-apps/api/event";
import {
  BARRAGE_MESSAGE_EVENT,
  VOICE_BROADCAST,
  WELCOME_EVENT
} from "@/constants";
import { getStore, setStore } from "@/store/tauri";
import { Speech } from "@/types";

const speechConfig = ref<Speech>(await getStore(VOICE_BROADCAST));

type speechItem = {
  str: string;
  type: string;
};

const DANMU = "general";
const GIFT = "gift";
const WELCOME = "action";

const voiceList = window.speechSynthesis
  .getVoices()
  .filter((voice) => voice.lang.includes("zh-"))
  .map((voice) => ({
    label: `${voice.name}(${voice.lang})`,
    value: voice.name,
    origin: voice
  }));

const toggleChange = async () =>
  setStore(VOICE_BROADCAST, speechConfig.value as any);

const speechList = ref<speechItem[]>([]);

const handleSpeech = async (type: string, item: any) => {
  if (!speechConfig.value.isOpen) return;
  switch (type) {
    case WELCOME: {
      console.log(WELCOME, speechConfig.value.onWelcome);
      if (!speechConfig.value.onWelcome) break;

      const { uname } = item;
      const str = `欢迎 ${uname} 进入直播间`;

      speechList.value.push({ str, type: "welcome" });
      break;
    }

    case GIFT: {
      console.log(GIFT, speechConfig.value.onGift);
      // 礼物信息
      if (!speechConfig.value.onGift) break;

      const { giftName, num, uname } = item;
      const str = `感谢 ${uname} 赠送的${num}个${giftName}`;

      speechList.value.push({ str, type: "gift" });

      break;
    }

    case DANMU: {
      console.log(DANMU, speechConfig.value.onDanmu);
      // 弹幕信息
      if (!speechConfig.value.onDanmu) break;
      const { isEmoji, message, uname } = item;

      if (isEmoji) break;
      const str = `${uname} 说: ${message}`;
      speechList.value.push({ str, type: "danmu" });
      break;
    }
    default:
      break;
  }
};

const synth = window.speechSynthesis;
const playSpeech = () => {
  console.log("voices", voiceList.length);
  setInterval(() => {
    // 关闭语音播报时清空列表
    if (!speechConfig.value.isOpen) {
      synth.cancel();
      speechList.value.splice(0);
    }

    // 关闭弹幕播放时清空弹幕列表
    if (!speechConfig.value.onDanmu) {
      speechList.value = speechList.value.filter(
        (item) => item.type !== "danmu"
      );
    }

    // 关闭礼物播报时清空礼物列表
    if (!speechConfig.value.onGift) {
      speechList.value = speechList.value.filter(
        (item) => item.type !== "gift"
      );
    }

    // 关闭互动播报时清空互动列表
    if (!speechConfig.value.onWelcome) {
      speechList.value = speechList.value.filter(
        (item) => item.type !== "welcome"
      );
    }

    if (speechList.value.length && !synth.speaking) {
      const speech = new SpeechSynthesisUtterance();

      speech.text = speechList.value.shift()?.str || "";
      // speech.voice =
      //   voiceList.find(
      //     (voice) => voice.value === speechConfig.value.speechVoice
      //   )?.origin || voiceList[0].origin;

      speech.rate = speechConfig.value.rate; // 语速
      speech.volume = speechConfig.value.volume / 100; // 音量
      speech.pitch = speechConfig.value.pitch; // 音调

      console.log("播放了", speech);
      synth.speak(speech);
    }
  }, 0);
};

const initSpeech = () => {
  // 挂载需要监听的事件
  listen<string>(BARRAGE_MESSAGE_EVENT, async (event) => {
    const data = JSON.parse(event.payload);
    for (const item of data) {
      await handleSpeech(item.barrageType, item.barrage);
    }
  });
  listen<string>(WELCOME_EVENT, async (event) => {
    const data = JSON.parse(event.payload);
    for (const item of data) {
      await handleSpeech(WELCOME, item.barrage);
    }
  });
  playSpeech();
};

initSpeech();

export { voiceList, speechConfig, toggleChange };