import { readDir, createDir } from "@tauri-apps/api/fs";
import { open } from "@tauri-apps/api/shell";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { Howl } from "howler";
import { listen } from "@tauri-apps/api/event";
import {
  BARRAGE_SOUND,
  STORE_DEFAULT_PATH,
  BARRAGE_MESSAGE_EVENT
} from "@/constants";
import { getStore, setStore } from "@/store/tauri";
import { Sound, SoundItem } from "@/types";
import { NaiveMessage } from "@/utils/navie";

const soundConfig = ref<Sound>(await getStore(BARRAGE_SOUND));
const audioPath = `${STORE_DEFAULT_PATH}/audio`;

const playSound = async (row: SoundItem) => {
  if (!soundConfig.value.isOpen || !row.status) return;
  const assetUrl = await convertFileSrc(
    `${STORE_DEFAULT_PATH}/audio/${row.key}`
  );
  const audio = new Howl({
    src: assetUrl,
    volume: soundConfig.value.volume / 100,
    onloaderror: (id, error) => {
      NaiveMessage.error("音频文件不存在");
      const invalid = soundConfig.value.files.findIndex(
        (file) => file.key === row.key
      );
      soundConfig.value.files.splice(invalid, 1);
      toggleChange();
    },
    onload: () => {
      audio.play();
    }
  });
};

const openDir = async () => {
  await open(audioPath);
};

const toggleChange = () => setStore(BARRAGE_SOUND, soundConfig.value as any);

// 初始化弹幕音效配置
const initSound = async () => {
  let configSounds: SoundItem[] = [];
  // 先读取本地配置文件中的音效列表
  configSounds = soundConfig.value.files;
  // 第一次时新建audio文件夹
  await readDir(audioPath).catch(async () => {
    await createDir(audioPath);
  });

  // 加载本地文件
  const files = await readDir(audioPath);

  const audioReg = /(.mp3)$/;

  for (const file of files) {
    if (!audioReg.test(file.name!)) continue;
    const baseName = file.name!.replace(".mp3", "");
    const findItem = configSounds.find((item) => item.key === file.name);
    // 如果有新的文件加入，则添加到配置列表中
    if (!findItem) {
      configSounds.push({
        key: file.name!,
        keyword: [baseName],
        status: true
      });
    } else {
      const keyword = findItem.keyword;
      // 如果关键字的数组为空，重新添加文件名称为默认的关键字
      if (Array.isArray(keyword) && !keyword.length) {
        findItem.keyword = [baseName];
      }
    }
  }

  await toggleChange();

  // 挂载需要监听的事件
  listen<string>(BARRAGE_MESSAGE_EVENT, async (event) => {
    const data = JSON.parse(event.payload);
    for (const item of data) {
      if (item.barrageType === "general") {
        const { message } = item.barrage;
        const file = soundConfig.value.files.find((file) =>
          file.keyword.includes(message)
        );
        file && playSound(file);
      }
    }
  });
};

export { soundConfig, initSound, toggleChange, openDir, playSound };