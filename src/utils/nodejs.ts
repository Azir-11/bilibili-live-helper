import fs from "fs";
import { store } from "@/stores/electron";

// 获取音效目录
const getAudioPath = () =>
  store.path.split("/").slice(0, -1).join("/") + "/audio";

// 判断文件夹是否存在
const isPathExist = () => {
  try {
    return fs.statSync(getAudioPath());
  } catch (error) {
    return false;
  }
};

// 得到音效文件
const getAudioFiles = () => {
  // 音频文件匹配正则
  const audioReg = /(.mp3)$/;

  try {
    // 读取目录下的文件 并去掉不是音频的文件
    const files = fs.readdirSync(getAudioPath());

    files.forEach((item, index) => {
      if (!audioReg.test(item)) {
        files.splice(index, 1);
      }
    });

    return files;
  } catch (error: any) {
    return [];
  }
};

// 播放音频
const playAudio = (file: string) => {
  const filePath = `${getAudioPath()}/${file}`;

  const data = Buffer.from(fs.readFileSync(filePath)).toString("base64");

  // 将文件转为 base64 格式
  const base64: any = `data:audio/x-wav;base64,${data}`;

  // 创建一个 audio 对象
  const audio = new Audio();

  audio.src = base64;

  // 等音频准备好后播放
  audio.oncanplaythrough = () => {
    audio.play();
  };

  // 播放完销毁 audio 对象
  audio.onended = () => {
    audio.remove();
  };
};

// 切割掉音频文件的后缀
const splitAudioSuffix = (fileName: string) =>
  fileName.split(".").slice(0, -1).join(".");

export {
  getAudioPath,
  getAudioFiles,
  isPathExist,
  playAudio,
  splitAudioSuffix
};