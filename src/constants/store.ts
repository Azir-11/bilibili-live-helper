import { configDir } from "@tauri-apps/api/path";

const STORE_DEFAULT_VALUES: Record<string, any> = {
  version: "1.0.0",
  voice_broadcast: {
    isOpen: true,
    onWelcome: true,
    onGift: true,
    onDanmu: true,
    speechVoice: undefined,
    volume: 50,
    rate: 1,
    pitch: 1
  }
};

// 本地配置文件路径
const STORE_DEFAULT_PATH = (await configDir()) + "bilibili-live-helper";

export { STORE_DEFAULT_VALUES, STORE_DEFAULT_PATH };