import { emit } from "@tauri-apps/api/event";
import { nanoid } from "nanoid";

import { encode, decode } from "@/utils/socket";
import { websocketUrl, messageEvent, popularityEvent } from "@/constants";

let websocket: WebSocket;
let timer: ReturnType<typeof setInterval> | null;

// 开启长链接
export const openWebsocket = (roomid: number) => {
  closeWebsocket();

  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  websocket = new WebSocket(websocketUrl);

  websocket.onopen = () => {
    websocket && websocket.readyState === websocket.OPEN && onConnect(roomid);
  };

  websocket.onmessage = (msgEvent) => onMessage(msgEvent);

  websocket.onerror = () => openWebsocket(roomid);

  websocket.onclose = () => openWebsocket(roomid);
};

// 关闭长链接
export const closeWebsocket = () => {
  websocket && websocket.close();
};

// 发送连接信息
const onConnect = (roomid: number) => {
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
      await emit(popularityEvent, result.body.count);
      break;
    case 5:
      for (const item of result.body) {
        const id = nanoid();
        const { cmd } = item;
        // 发出其他信息
        await emit(messageEvent, { cmd, id, item });
      }
      break;
  }
};