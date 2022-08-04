import { Body } from "@tauri-apps/api/http";
import { getQueryData } from ".";
import { liveBaseUrl, baseRoomId } from "@/constants";

// 获取直播分类
const getLiveCategoryApi = async () =>
  await getQueryData(
    `${liveBaseUrl}/xlive/web-interface/v1/index/getWebAreaList`,
    {
      query: { source_id: "2" }
    }
  );

// 获取当前直播状态
const getLiveStatusApi = async (roomid: number = baseRoomId) =>
  await getQueryData(`${liveBaseUrl}/xlive/web-room/v1/index/getRoomBaseInfo`, {
    query: { room_ids: "" + roomid, req_biz: "link-center" }
  });

// 获取直播线路
const getLiveLineApi = async () =>
  await getQueryData(
    `${liveBaseUrl}/xlive/app-blink/v1/live/getWebUpStreamAddr`,
    {
      query: { platform: "pc" },
      headers: { cookie: "" }
    }
  );

// 开始直播 or 停止直播
const changeLiveStatusApi = async (liveStatus: boolean, area_v2?: string) =>
  await getQueryData(
    `${liveBaseUrl}/room/v1/Room/${!liveStatus ? "startLive" : "stopLive"}`,
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