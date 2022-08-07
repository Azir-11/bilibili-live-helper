import { Body } from "@tauri-apps/api/http";
import { getQueryData } from ".";
import { BASE_URL_PREFIX, baseUserId, LOGIN_URL_PREFIX } from "@/constants";

// 获取用户粉丝数量
const getFansApi = async (uid?: string) =>
  await getQueryData(`${BASE_URL_PREFIX}/x/relation/stat`, {
    query: {
      vmid: uid || baseUserId,
      jsonp: "jsonp"
    }
  });

// 获取用户信息
const getUserInfoApi = async (mid: string) =>
  await getQueryData(`${BASE_URL_PREFIX}/x/space/acc/info`, {
    query: { mid, jsonp: "jsonp" }
  });

// 获取 up 和用户关系信息
const getRelationApi = async () =>
  await getQueryData(`${BASE_URL_PREFIX}/x/space/acc/relation`, {
    query: {
      mid: ""
    },
    headers: {
      cookie: ""
    }
  });

// 获取登录url
const getLoginUrlApi = async () =>
  await getQueryData(`${LOGIN_URL_PREFIX}/qrcode/getLoginUrl`, {
    returnError: true
  });

// 验证二维码是否被扫
const verifyQrCodeApi = async (oauthKey: string) =>
  await getQueryData(`${LOGIN_URL_PREFIX}/qrcode/getLoginInfo`, {
    method: "POST",
    body: Body.form({
      oauthKey,
      gourl: "https://www.bilibili.com/"
    }),
    returnError: true
  });

// 获取 up 最新的一期视频的 bvid
const getUpNewVideoBVidApi = async () =>
  await getQueryData(`${BASE_URL_PREFIX}/x/space/arc/search`, {
    query: {
      mid: "",
      pn: 1,
      ps: 1,
      index: 1,
      jsonp: "jsonp"
    },
    returnError: true
  });

// 获取 up 最新一期视频的信息
const getUpNewVideoInfoApi = async () => {
  // 获取 bvid
  const bvidResult = await getUpNewVideoBVidApi();
  console.log("bvidResult", bvidResult);
  if (bvidResult?.code) return;

  const result = await getQueryData(`${BASE_URL_PREFIX}/x/web-interface/view`, {
    query: { bvid: bvidResult.data.list.vlist[0].bvid }
  });
  console.log("result", result);
  if (result?.code) return;

  const {
    title,
    owner: { face, name },
    stat: { view, like, coin, favorite, share, reply, danmaku }
  } = result.data;

  return {
    title,
    face,
    name,
    view,
    like,
    coin,
    favorite,
    share,
    reply,
    danmaku
  };
};

export {
  getFansApi,
  getUserInfoApi,
  getRelationApi,
  getLoginUrlApi,
  verifyQrCodeApi,
  getUpNewVideoInfoApi
};