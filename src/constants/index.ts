export const UP_INFO = {
  uid: "up_info.uid",
  cookie: "up_info.cookie",
  csrf: "up_info.csrf",
  room_id: "up_info.room_id",
  avatar: "up_info.avatar",
  uname: "up_info.uname"
};

export const MESSAGE_TYPE = {
  RANK: "ONLINE_RANK_V2",
  DANMU: "DANMU_MSG",
  GIFT: "SEND_GIFT",
  COMBO: "COMBO_SEND",
  INTERACT: "INTERACT_WORD",
  ENTRY: "ENTRY_EFFECT",
  TOP3: "ONLINE_RANK_TOP3",
  SUPERCHAT: "SUPER_CHAT_MESSAGE",
  ROOMCHANGE: "ROOM_CHANGE",
  LIVESTART: "PREPARING",
  LIVECLOSE: "LIVE",
  REDPACKET: "POPULARITY_RED_POCKET_NEW",
  WATCHCHANGE: "WATCHED_CHANGE"
};

export const VOICE_BROADCAST = "voice_broadcast";

export * from "./url";
export * from "./events";
export * from "./store";
export * from "./tip";
export * from "./assets";