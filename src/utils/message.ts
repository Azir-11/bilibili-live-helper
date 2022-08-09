import { nanoid } from "nanoid";
import { emit } from "@tauri-apps/api/event";
import { MESSAGE_TYPE, UP_INFO, WATCHEDCHANGE_EVENT } from "@/constants";
import { getStore } from "@/store/tauri";
import { colorHexToRgba } from "@/utils/socket";

// 格式化弹幕信息
const handleMessage = async (messages: any[]) => {
  const rankList: any[] = [];
  const barrageList: any[] = [];
  const giftList: any[] = [];
  const welcomeList: any[] = [];
  const superChatList: any[] = [];
  const redPocketList: any[] = [];

  // 处理单独一条弹幕信息的数据解析
  const messageFormatter = async (message: any) => {
    const { cmd } = message;
    switch (cmd) {
      // 直播间排行榜列表，只需要得到前三名
      case MESSAGE_TYPE.RANK:
        await parseRank(message?.data);
        break;

      // 礼物信息
      case MESSAGE_TYPE.GIFT || MESSAGE_TYPE.COMBO:
        await parseGift(message?.data);
        break;

      // 互动信息
      case MESSAGE_TYPE.INTERACT:
        await parseInteract(message?.data);
        break;

      // 进入信息
      case MESSAGE_TYPE.ENTRY:
        await parseEntry(message?.data);
        break;

      // 在线排行榜前三名
      case MESSAGE_TYPE.TOP3:
        await parseTop3(message?.data);
        break;

      // 弹幕信息
      case MESSAGE_TYPE.DANMU:
        await parseDamu(message?.info);
        break;

      // SC信息
      case MESSAGE_TYPE.SUPERCHAT:
        await parseSuperchat(message?.data);
        break;

      // 房间信息更新
      case MESSAGE_TYPE.ROOMCHANGE:
        // TODO 房间信息改变需要触发的操作
        break;

      // 直播开始
      case MESSAGE_TYPE.LIVESTART:
        // TODO 直播开始需要触发的操作
        break;

      // 直播关闭
      case MESSAGE_TYPE.LIVECLOSE:
        // TODO 直播关闭需要触发的操作
        break;

      // 红包信息
      case MESSAGE_TYPE.REDPACKET:
        await parseRedpacket(message?.data);
        break;

      // 观看人数更新
      case MESSAGE_TYPE.WATCHCHANGE:
        await emit(WATCHEDCHANGE_EVENT, { num: message?.data?.num });
        break;
    }
  };

  const parseRank = (data: any) => {
    const { list } = data;
    list.length > 3 && list.splice(3);
    rankList.splice(0);
    list.forEach((item: any) => rankList.push(item));
  };

  const parseGift = (data: any) => {
    const id = nanoid();

    barrageList.push({
      id,
      barrage: {
        ...data,
        isGift: true
      },
      barrageType: "gift"
    });

    giftList.push({
      id,
      barrage: {
        ...data,
        isGift: true
      },
      barrageType: "gift"
    });

    // 保存礼物信息
    // const giftStoreInfo = {
    //   uid: data.uid,
    //   uname: data.uname,
    //   giftName: data.giftName,
    //   giftNum: data.num,
    //   giftPrice: data.price / 100,
    //   timestamp: Date.now()
    // };
  };

  const parseInteract = (data: any) => {
    const id = nanoid();

    welcomeList.push({
      id,
      barrage: data,
      barrageType: "action"
    });
  };

  const parseEntry = (data: any) => {
    const id = nanoid();

    welcomeList.push({
      id,
      barrage: {
        ...data,
        msg_type: -1
      },
      barrageType: "action"
    });
  };

  const parseTop3 = (data: any) => {
    const id = nanoid();

    welcomeList.push({
      id,
      barrage: {
        rankInfo: data.list[0],
        msg_type: -10
      },
      barrageType: "action"
    });
  };

  const parseDamu = async (info: any) => {
    const id = nanoid();

    const up_id = await getStore(UP_INFO.uid);

    const barrageInfo = {
      uid: info[2][0],
      uname: info[2][1],
      message: info[1],
      isAnchor: info[2][0] === up_id,
      isManager: !!info[2][2], // 房管
      isGuard: info[7], // 舰队成员，1-总督，2-提督，3-舰长
      isEmoji: !!info[0][12], // 弹幕类型，0-文字，1-emoji
      emoji: info[0][13],
      unameColor: info[2][7],
      medal: info[3],
      backgroundColor: ""
    };
    const nameColor = barrageInfo.unameColor;

    if (nameColor) {
      barrageInfo.backgroundColor = colorHexToRgba(nameColor, 0.3) as string;
    }
    barrageList.push({
      id,
      barrage: barrageInfo,
      barrageType: "general"
    });

    // 处理弹幕音效
    // const message = barrageInfo.message.trim();
    // this.handleSound(message, barrageInfo);

    // 处理抽奖弹幕/表情动画
    // if (
    //   barrageInfo.message === "老板大气！点点红包抽礼物！" ||
    //   barrageInfo.isEmoji
    // ) { break; }

    // const storeInfo = {
    //   uid: barrageInfo.uid,
    //   uname: barrageInfo.uname,
    //   message: barrageInfo.message,
    //   timestamp: Date.now()
    // };

    // 保存弹幕信息
    // setDanmuStore(storeInfo, getStore(UP_INFO.uid));
  };

  const parseSuperchat = (data: any) => {
    const id = nanoid();

    superChatList.push({
      id,
      barrage: data,
      barrageType: "superchat"
    });
    giftList.push({
      id,
      barrage: data,
      barrageType: "superchat"
    });
    barrageList.push({
      id,
      barrage: data,
      barrageType: "superchat"
    });
  };

  const parseRedpacket = (data: any) => {
    const id = nanoid();

    redPocketList.push({
      id,
      barrage: data,
      barrageType: "redpocket"
    });
    giftList.push({
      id,
      barrage: data,
      barrageType: "redpocket"
    });
    barrageList.push({
      id,
      barrage: data,
      barrageType: "redpocket"
    });
  };

  for (const message of messages) {
    await messageFormatter(message);
  }

  return {
    rankList,
    barrageList,
    giftList,
    welcomeList,
    superChatList,
    redPocketList
  };
};

export default handleMessage;