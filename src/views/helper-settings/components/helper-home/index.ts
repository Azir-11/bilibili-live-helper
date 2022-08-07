import dayjs from "dayjs";
import { confirm } from "@tauri-apps/api/dialog";

import { getUserInfoApi } from "@/api/bilibili";
import { getLiveStatusApi, changeLiveStatusApi } from "@/api";

import { defatultAvatar } from "@/constants/bilibili";
import { getStore, setStore } from "@/store/tauri";
import { UP_INFO } from "@/constants";

const baseInfo = ref();

// 通过userid获取用户基本信息和直播信息
const getBaseInfo = async () => {
  const userId = await getStore(UP_INFO.uid) as string;
  const {
    name,
    face,
    live_room: {
      roomid,
      watched_show: { num }
    }
  } = await getUserInfoApi(userId);

  const { by_room_ids } = await getLiveStatusApi(roomid);

  const liveInfo = Object.values(by_room_ids)[0] as Object;

  await setStore(UP_INFO.uname, name);
  await setStore(UP_INFO.avatar, face);
  await setStore(UP_INFO.room_id, roomid);

  baseInfo.value = {
    name,
    face: face || defatultAvatar,
    num,
    ...liveInfo
  };
};

// 直播状态
const liveStatus = computed(() => {
  return baseInfo.value?.live_status === 1;
});

// 计算开播时长
const liveDuration = computed(() => {
  const start_utc = dayjs(baseInfo.value.live_time).subtract(8, "hours");
  const local_utc = dayjs().subtract(dayjs().utcOffset(), "minutes");
  return local_utc.diff(start_utc, "minute") + "分钟";
});

// 切换直播状态
const changeLiveStatus = async () => {
  const message = liveStatus.value
    ? "确定要关闭直播吗？"
    : "确定要开启直播吗？";
  const onConfirm = await confirm(message, {
    title: "Bilibili-直播助手",
    type: "warning"
  });

  onConfirm && (await changeLiveStatusApi(liveStatus.value));
};

export { getBaseInfo, baseInfo, liveStatus, liveDuration, changeLiveStatus };