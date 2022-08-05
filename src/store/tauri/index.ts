import { Store } from "tauri-plugin-store-api";
import { configDir } from "@tauri-apps/api/path";

import defaultConfig from "@/options/config";

const configPath = await configDir();
// 创建一个 store 对象
const store = new Store(`${configPath}bilibili-live-helper/config.json`);

// 初始化store文件
const initStore = async () => {
  try {
    await store.load();
    // 合并初始配置和用户自定义配置，以防缺少配置项
    Object.keys(defaultConfig).forEach(async (key: string) => {
      const setValue = (await getStore(key)) || defaultConfig[key];
      console.log("setValue", key, setValue);
      await setStore(key, setValue);
    });
    console.log("store", store);
    await saveStore();
  } catch (error) {
    Object.keys(defaultConfig).forEach(async (key: string) => {
      const defaultValue = defaultConfig[key];
      await setStore(key, defaultValue);
    });
    await saveStore(); // 保存到本地的时候会自动创建文件夹和文件;
  }
};

// 获取 store 参数
const getStore = async (key: string) => {
  try {
    return await store.get(key);
  } catch (error) {}
};

// 设置 store 参数
const setStore = async (key: string, value: any) => {
  try {
    await store.set(key, value);
  } catch (error) {}
};

// 写入store文件
const saveStore = async () => {
  try {
    await store.save();
  } catch (error) {
    console.log("error", error);
  }
};

// 删除 store 参数
const deleteStore = async (key: string) => {
  try {
    await store.delete(key);
  } catch (error) {}
};

// 清空 store 参数
const clearStore = async () => {
  try {
    await store.clear();
  } catch (error) {}
};

export { initStore, getStore, setStore, deleteStore, clearStore };