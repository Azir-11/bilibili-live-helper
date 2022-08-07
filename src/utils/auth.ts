import { isLoginApi } from "@/api";

const upIsLogin = async () => {
  const { isLogin } = await isLoginApi();
  return isLogin;
};

const robotIsLogin = () => {};

export { upIsLogin, robotIsLogin };