import { getQueryData } from ".";

// 小破站公共的请求前缀
const baseUrl = "https://api.bilibili.com";
// const QRcodeBaseUrl = "https://passport.bilibili.com";

// 获取粉丝数量
const getFansApi = async () =>
  await getQueryData(`${baseUrl}/x/relation/stat`, {
    query: { vmid: "478490349", jsonp: "jsonp" }
  });

export { getFansApi };