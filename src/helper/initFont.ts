import { FONT_CDN_URL } from "@/constants";

const initFont = () => {
  const fonts = ["HarmonyOS", "DIGIT"];

  // 创建 style 元素
  const style = document.createElement("style");

  for (const font of fonts) {
    style.innerHTML += `
        @font-face {
          font-family: ${font};
          src: url('${FONT_CDN_URL}/${font}.woff2')
              format("woff2"),
            url('${FONT_CDN_URL}/${font}.woff')
              format("woff"),
            url('${FONT_CDN_URL}/${font}.ttf');
          font-display: auto;
        }
    `;
  }

  // 添加到 head 中
  document.head.appendChild(style);
};

export default initFont;