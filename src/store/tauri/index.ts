import { Store } from "tauri-plugin-store-api";
import { STORE_DEFAULT_VALUES, STORE_DEFAULT_PATH } from "@/constants";

// 创建一个 store 对象
const store = new Store(`${STORE_DEFAULT_PATH}/.config.dat`);

// 初始化store文件
const initStore = async () => {
  try {
    await store.load();
    // 合并初始配置和用户自定义配置，以防缺少配置项
    for (const key of Object.keys(STORE_DEFAULT_VALUES)) {
      const setValue = (await getStore(key)) || STORE_DEFAULT_VALUES[key];

      await setStore(key, setValue);
    }

    await saveStore();
  } catch (error) {
    for (const key of Object.keys(STORE_DEFAULT_VALUES)) {
      const defaultValue = STORE_DEFAULT_VALUES[key];
      await setStore(key, defaultValue);
    }
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

    await saveStore();
  } catch (error) {}
};

// 写入 store 文件
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