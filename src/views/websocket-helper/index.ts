import { emit } from "@tauri-apps/api/event";
import { encode, decode } from "@/utils/socket";
import { nanoid } from "nanoid";

let websocket: WebSocket;
let timer: NodeJS.Timer | null;

const websocketUrl = "ws://broadcastlv.chat.bilibili.com:2244/sub";
const roomid = 1440094;

// 开启长链接
export const openWebsocket = () => {
  if (websocket) {
    websocket.close();
  }

  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  websocket = new WebSocket(websocketUrl);

  websocket.onopen = () => {
    websocket && websocket.readyState === websocket.OPEN && onConnect();
  };

  websocket.onmessage = (msgEvent) => onMessage(msgEvent);

  websocket.onerror = () => openWebsocket();

  websocket.onclose = () => openWebsocket();
};

// 发送连接信息
const onConnect = () => {
  websocket.send(
    encode(
      JSON.stringify({
        protover: 1,
        clientver: "1.4.0",
        roomid
      }),
      7
    )
  );

  // 初始化人气
  websocket.send(encode("", 2));

  // 发送心跳
  timer = setInterval(() => {
    websocket && websocket.send(encode("", 2));
  }, 30000);
};

// 接收弹幕信息
const onMessage = async (msgEvent: any) => {
  const result: any = await decode(msgEvent.data);
  switch (result.op) {
    case 3:
      // 发出人气信息
      await emit("popularity-trigger", result.body.count);
      break;
    case 5:
      for (const item of result.body) {
        const id = nanoid();
        const { cmd } = item;
        // 发出其他信息
        await emit("message-trigger", { cmd, id, item });
      }
      break;
  }
};