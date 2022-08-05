import { Store } from "tauri-plugin-store-api";
import { configDir } from "@tauri-apps/api/path";

// 创建一个 store 对象
const store = new Store(`${configDir}/bilibili-live-helper/config.json`);

// 获取 store 参数
const getStore = async (key: string) => {
  return await store.get("some-key");
};

// 设置 store 参数
const setStore = async (key: string, value: any) => {
  await store.set(key, value);
};

// 删除 store 参数
const deleteStore = async (key: string) => {
  await store.delete(key);
};

// 清空 store 参数
const clearStore = async () => {
  await store.clear();
};

export { getStore, setStore, deleteStore, clearStore };