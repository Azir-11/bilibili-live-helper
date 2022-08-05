import { fetch } from "@tauri-apps/api/http";
import { writeBinaryFile, readBinaryFile } from "@tauri-apps/api/fs";

import { OSS_URL, STORE_DEFAULT_PATH } from "@/constants";

const requireFonts = ["DIGIT.TTF", "HarmonyOS.ttf"];

// 初始化同步软件字体
const initFonts = async () => {
  for (const font of requireFonts) {
    const isExist = await isFileExist(font);
    !isExist && downloadFont(font);
  }

  loadFonts();
};

// 判断字体文件是否存在
const isFileExist = async (fontName: string) => {
  try {
    await readBinaryFile(`${STORE_DEFAULT_PATH}/${fontName}`);
    return true;
  } catch (error) {
    return false;
  }
};

// 下载字体文件
const downloadFont = async (fontName: string) => {
  console.log(`开始下载字体文件：${fontName}`);
  const url = `${OSS_URL}/${fontName}`;
  const filePath = `${STORE_DEFAULT_PATH}/${fontName}`;

  const { data } = await fetch(url, {
    method: "GET",
    responseType: 3
  });

  await writeBinaryFile(filePath, new Uint8Array(data as ArrayBuffer));
};

// 加载字体
const loadFonts = async () => {
  for (const font of requireFonts) {
    // TODO 用二进制文件引入没有问题，但是用url引入就会报错
    const fontFace = new FontFace(
      font.split(".")[0],
      await readBinaryFile(`${STORE_DEFAULT_PATH}/${font}`)
    );

    console.log("加载完成", fontFace.family, fontFace.status);

    document.fonts.add(fontFace);
  }
};

export { initFonts };