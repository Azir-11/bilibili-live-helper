import { emit } from "@tauri-apps/api/event";
import { ask } from "@tauri-apps/api/dialog";
import dayjs from "dayjs";
import { FANS_COUNT_EVENT, UP_INFO } from "@/constants";
import {
  getFansApi,
  getUserInfoApi,
  getLiveStatusApi,
  changeLiveStatusApi
} from "@/api";
import { NaiveMessage } from "@/utils/navie";
import { setStore } from "@/store/tauri";
import { useAnchorInfoStore } from "@/store/pinia/anchorInfo";

const useAnchorInfo = () => {
  // 是否在加载中
  const isLoading = ref(true);

  // 是否开通直播间
  const isOpenLive = ref(true);

  // 是否有 roomid
  const hasRoomId = ref(false);

  // 主播信息
  const { anchorInfo } = storeToRefs(useAnchorInfoStore());

  // 获取粉丝
  const getFans = async () => {
    const result = await getFansApi();
    if (!result) {
      getFans();
      return;
    }

    const follower = result.follower;
    anchorInfo.value = { ...anchorInfo.value, follower };
    // 发布消息
    emit(FANS_COUNT_EVENT, follower);
    // 每 6s 调一次
    // setTimeout(getFans, 1000 * 10);
  };

  // 获取基本信息
  const getUserInfo = async () => {
    const result = await getUserInfoApi();
    if (!result) {
      getUserInfo();
      return;
    }

    const { name, face, live_room } = result;

    setStore(UP_INFO.uname, name);
    setStore(UP_INFO.avatar, face);

    if (!live_room) {
      isOpenLive.value = false;

      return;
    }

    let { roomid, watched_show } = live_room;
    roomid = roomid.toString();

    setStore(UP_INFO.room_id, roomid);

    hasRoomId.value = true;

    const liveInfoResult = await getLiveStatusApi(roomid);
    if (!liveInfoResult) {
      isOpenLive.value = false;

      return;
    }

    const roomInfo = liveInfoResult.by_room_ids[roomid];

    anchorInfo.value = {
      ...anchorInfo.value,
      name,
      face,
      roomid,
      num: watched_show.num,
      ...roomInfo,
      liveStatus: roomInfo.live_status === 1
    };

    console.log("anchorInfo.value", anchorInfo.value);
  };

  // 改变直播状态
  const changeLiveStatus = async () => {
    const message = anchorInfo.value.liveStatus
      ? "确定要关闭直播吗？"
      : "确定要开启直播吗？";

    const onAsk = await ask(message, {
      title: "Bilibili-直播助手",
      type: "warning"
    });

    if (!onAsk) return;

    const result = await changeLiveStatusApi(anchorInfo.value.liveStatus);

    if (!result) return;

    anchorInfo.value.liveStatus = !anchorInfo.value.liveStatus;
    anchorInfo.value.live_time = dayjs().format("YYYY-MM-DD HH:mm:ss");

    NaiveMessage.success(
      anchorInfo.value.liveStatus ? "直播已开启" : "直播已关闭"
    );
  };

  onMounted(async () => {
    await getFans();

    await getUserInfo();

    isLoading.value = false;
  });

  return {
    isLoading,
    isOpenLive,
    hasRoomId,
    anchorInfo,
    changeLiveStatus
  };
};

export default useAnchorInfo;