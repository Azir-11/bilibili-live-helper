import { Body } from "@tauri-apps/api/http";
import { getQueryData } from ".";
import { getStore } from "@/store/tauri";
import { LIVE_URL_PREFIX, UP_INFO, ROBOT_INFO } from "@/constants";
import { robotIsLogin } from "@/utils/auth";
import type { SendMessage } from "@/types";

// 获取直播分类
const getLiveCategoryApi = async () =>
  await getQueryData(
    `${LIVE_URL_PREFIX}/xlive/web-interface/v1/index/getWebAreaList`,
    {
      query: { source_id: "2" }
    }
  );

// 获取当前直播状态
const getLiveStatusApi = async (room_ids: string) =>
  await getQueryData(
    `${LIVE_URL_PREFIX}/xlive/web-room/v1/index/getRoomBaseInfo`,
    {
      query: { room_ids, req_biz: "link-center" }
    }
  );

// 获取直播线路
const getLiveStreamApi = async () =>
  await getQueryData(
    `${LIVE_URL_PREFIX}/xlive/app-blink/v1/live/getWebUpStreamAddr`,
    {
      query: { platform: "pc" },
      headers: { cookie: await getStore(UP_INFO.cookie) }
    }
  );

// 获取身份码
const getLiveCodeApi = async () =>
  await getQueryData(
    `${LIVE_URL_PREFIX}/xlive/open-platform/v1/common/operationOnBroadcastCode`,
    {
      method: "POST",
      body: Body.form({
        action: "1",
        csrf_token: await getStore(UP_INFO.csrf),
        csrf: await getStore(UP_INFO.csrf)
      }),
      headers: { cookie: await getStore(UP_INFO.cookie) }
    }
  );

// 开始直播 or 停止直播
const changeLiveStatusApi = async (
  liveStatus: boolean,
  area_v2: string = "372"
) =>
  await getQueryData(
    `${LIVE_URL_PREFIX}/room/v1/Room/${!liveStatus ? "startLive" : "stopLive"}`,
    {
      method: "POST",
      body: Body.form({
        room_id: await getStore(UP_INFO.room_id),
        platform: "pc",
        area_v2,
        csrf_token: await getStore(UP_INFO.csrf),
        csrf: await getStore(UP_INFO.csrf)
      }),
      headers: {
        cookie: await getStore(UP_INFO.cookie)
      }
    }
  );

// 获取礼物列表
const getGiftApi = async () => {
  const result = await getQueryData(
    `${LIVE_URL_PREFIX}/xlive/web-room/v1/giftPanel/giftConfig`,
    {
      query: {
        platform: "pc",
        room_id: "",
        area_parent_id: 11,
        area_id: 372
      }
    }
  );

  if (result) {
    const styleElement = document.createElement("style");
    // 礼物列表
    const giftList = result.data.list.map(
      ({ id, gif }: any) => `.gift-${id} { background-image: url(${gif}) } `
    );
    // 背景图片列表
    const backgroundImageList = result.data.combo_resources.map(
      ({ img_four }: any, index: number) =>
        `.background-image-${index} { background-image: url(${img_four}) } `
    );

    styleElement.innerHTML = [...giftList, ...backgroundImageList].join("");

    document.head.appendChild(styleElement);

    return backgroundImageList.length;
  }
};

// 获取表情列表
const getEmojiApi = async () =>
  await getQueryData(
    `${LIVE_URL_PREFIX}/xlive/web-ucenter/v2/emoticon/GetEmoticons`,
    {
      query: {
        platform: "pc",
        room_id: await getStore(UP_INFO.room_id)
      },
      headers: {
        cookie: await getStore(UP_INFO.cookie)
      },
      hideLoadingBar: true
    }
  );

// 发送消息
const sendMessageApi = async (message: SendMessage) => {
  let cookie, csrf;

  // 如果有机器人账户信息
  if (await robotIsLogin()) {
    // 主动发送 or 自动发送
    if (message.isInitiative) {
      cookie = await getStore(UP_INFO.cookie);
      csrf = await getStore(UP_INFO.csrf);
    } else {
      cookie = await getStore(ROBOT_INFO.cookie);
      csrf = await getStore(ROBOT_INFO.cookie);
    }
  } else {
    cookie = await getStore(UP_INFO.cookie);
    csrf = await getStore(UP_INFO.csrf);
  }

  return await getQueryData(`${LIVE_URL_PREFIX}/msg/send`, {
    method: "POST",
    body: Body.form({
      ...message,
      isInitiative: "",
      bubble: "0",
      color: "16777215",
      mode: "1",
      fontsize: "25",
      rnd: Math.floor(Date.now() / 1000).toString(),
      roomid: await getStore(UP_INFO.room_id),
      csrf,
      csrf_token: csrf
    }),
    headers: {
      cookie
    },
    hideLoadingBar: true
  });
};

// 获取直播视频流
const getLiveStreamUrlApi = async (qn: string = "0", roomid?: string) =>
  await getQueryData(`${LIVE_URL_PREFIX}/room/v1/Room/playUrl`, {
    query: {
      cid: roomid || (await getStore(UP_INFO.room_id)),
      qn,
      platform: "web"
    }
  });

// 获取关注的主播列表
const getMyFollowLiveInfo = async (page: string = "1") =>
  await getQueryData(
    `${LIVE_URL_PREFIX}/xlive/web-ucenter/v1/xfetter/GetWebList`,
    {
      query: {
        page,
        page_size: "10"
      },
      headers: {
        cookie: await getStore(UP_INFO.cookie)
      }
    }
  );

export {
  getLiveCategoryApi,
  getLiveStatusApi,
  getLiveStreamApi,
  getLiveCodeApi,
  changeLiveStatusApi,
  getGiftApi,
  getEmojiApi,
  sendMessageApi,
  getLiveStreamUrlApi,
  getMyFollowLiveInfo
};