// 小破站基础 api 前缀
const BASE_URL_PREFIX = "https://api.bilibili.com";

// 小破站登录 api 前缀
const LOGIN_URL_PREFIX = "https://passport.bilibili.com";

// 小破站直播 api 前缀
const LIVE_URL_PREFIX = "https://api.live.bilibili.com";

// 小破站主页的 url 前缀
const HOME_URL_PREFIX = "https://space.bilibili.com";

// 小破站直播间的 url 前缀
const ROOM_URL_PREFIX = "https://live.bilibili.com";

// 音乐相关 api 前缀
const MUSIC_URL_PREFIX = "https://music-node.vercel.app";

// 播放音乐的 url 前缀
const PLAY_MUSIC_URL_PREFIX = "http://music.163.com/song/media/outer";

// 个人直播间信息地址
const ROOM_INFO_URL =
  "https://link.bilibili.com/p/center/index#/my-room/start-live";

// 直播长链接地址
const WEBSOCKET_URL = "ws://broadcastlv.chat.bilibili.com:2244/sub";

// CDN 地址
const CDN_URL = "https://font.ayangweb.cn";

// CDN 图片地址
const IMAGE_CDN_URL = `${CDN_URL}/img`;

// CDN 字体地址
const FONT_CDN_URL =
  "https://cdn.jsdelivr.net/gh/bilibili-ayang/bilibili-live-helper-cdn@1.0/font";

// CDN 音频地址
const AUDIO_CDN_URL = `${CDN_URL}/audio`;

export {
  BASE_URL_PREFIX,
  LOGIN_URL_PREFIX,
  LIVE_URL_PREFIX,
  HOME_URL_PREFIX,
  ROOM_URL_PREFIX,
  MUSIC_URL_PREFIX,
  PLAY_MUSIC_URL_PREFIX,
  ROOM_INFO_URL,
  WEBSOCKET_URL,
  CDN_URL,
  IMAGE_CDN_URL,
  FONT_CDN_URL,
  AUDIO_CDN_URL
};