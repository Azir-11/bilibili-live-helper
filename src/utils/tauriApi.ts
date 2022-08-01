import { WebviewWindow, appWindow } from "@tauri-apps/api/window";
import { windowOptions } from "@/options/tauri";
import type { Path } from "@/types/router";

/**
 * 开启一个新的窗口
 * @param url 窗口的路由地址
 */
const openNewWindow = async (url: Path) => {
  // 窗口 option
  const option = windowOptions[url];
  // 窗口 label
  const label = option.title!;

  // 查找是否存在窗口 存在就显示并获取焦点 不存在则新建
  // BUG：如果主窗口被刷新了，再次打开新窗口时就获取不到，导致获取不了焦点。
  const newWindow = WebviewWindow.getByLabel(label);
  if (newWindow) {
    newWindow.show();
  } else {
    await new WebviewWindow(label, {
      url,
      ...option
    });
  }
};

/**
 * 最小化当前窗口
 */
const minimizeWindow = () => appWindow.minimize();

/**
 * 关闭当前窗口
 */
const closeWindow = () => appWindow.close();

/**
 * 设置当前窗口置顶状态
 * @param value 是否置顶
 */
const setWindowOnTop = (value: boolean) => appWindow.setAlwaysOnTop(value);

export { openNewWindow, minimizeWindow, closeWindow, setWindowOnTop };