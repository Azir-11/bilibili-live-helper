import { getStore, deleteStore } from "@/store/tauri";
import { UP_INFO } from "@/constants";

// 验证 up 登录信息是否存在
const upIsLogin = async () =>
  (await getStore(UP_INFO.uid)) &&
  (await getStore(UP_INFO.cookie)) &&
  (await getStore(UP_INFO.csrf));

// 验证机器人信息是否存在
const robotIsLogin = () => {};

// 清除 up 主信息
const clearUpInfo = () => {
  Object.values(UP_INFO).forEach((key) => {
    deleteStore(key);
  });
};

export { upIsLogin, robotIsLogin, clearUpInfo };