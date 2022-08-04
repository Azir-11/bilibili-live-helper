import { getQueryData } from ".";
import { baseUrl, baseUserId } from "@/constants";

// 获取用户信息
const getUserInfoApi = async (userid: number = baseUserId) =>
  await getQueryData(`${baseUrl}/x/space/acc/info`, {
    query: { mid: "" + userid, jsonp: "jsonp" }
  });

export { getUserInfoApi };