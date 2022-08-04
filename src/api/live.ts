import { Body } from "@tauri-apps/api/http";
import { getQueryData } from ".";

// 直播信息公共的请求前缀
const baseUrl = "https://api.live.bilibili.com";

// 获取直播分类
const getLiveCategoryApi = async () =>
  await getQueryData(`${baseUrl}/xlive/web-interface/v1/index/getWebAreaList`, {
    query: { source_id: "2" }
  });

// 获取当前直播状态
const getLiveStatusApi = async () =>
  await getQueryData(`${baseUrl}/xlive/web-room/v1/index/getRoomBaseInfo`, {
    query: { room_ids: "22835031", req_biz: "link-center" }
  });

// 获取直播线路
const getLiveLineApi = async () =>
  await getQueryData(`${baseUrl}/xlive/app-blink/v1/live/getWebUpStreamAddr`, {
    query: { platform: "pc" },
    headers: { cookie: "" }
  });

// 开始直播 or 停止直播
const changeLiveStatusApi = async (liveStatus: boolean, area_v2?: string) =>
  await getQueryData(
    `${baseUrl}/room/v1/Room/${!liveStatus ? "startLive" : "stopLive"}`,
    {
      method: "POST",
      body: Body.json({
        room_id: "",
        platform: "pc",
        area_v2,
        csrf_token: "",
        csrf: ""
      }),
      headers: {
        cookie: ""
      }
    }
  );

export {
  getLiveCategoryApi,
  getLiveStatusApi,
  getLiveLineApi,
  changeLiveStatusApi
};