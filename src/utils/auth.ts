import { UP_INFO } from "@/constants";
import { getStore } from "@/store/tauri";

const upIsLogin = async () =>
  (await getStore(UP_INFO.uid)) &&
  (await getStore(UP_INFO.cookie)) &&
  (await getStore(UP_INFO.csrf));

const robotIsLogin = () => {};

export { upIsLogin, robotIsLogin };