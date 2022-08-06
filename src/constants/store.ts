import { configDir } from "@tauri-apps/api/path";

const STORE_DEFAULT_VALUES: Record<string, any> = {
  version: "1.0.0",
  UP_INFO: {
    uid: "uid",
    csrf: "csrf",
    cookie: "cookie",
    roomid: "roomid"
  }
};

// 本地配置文件路径
const STORE_DEFAULT_PATH = (await configDir()) + "bilibili-live-helper";

export { STORE_DEFAULT_VALUES, STORE_DEFAULT_PATH };