<script setup lang="ts">
import { emit, listen } from "@tauri-apps/api/event";
import * as EVENTS from "@/constants/events";
import useWebsocket from "@/hooks/useWebsocket";
import { openNewWindow } from "@/utils/tauri";

const roomid = ref("23817749");
const connected = ref(false);

const stopWebsocket = () => {
  connected.value = false;
  emit(EVENTS.CLOSE_WEBSOCKET_EVENT);
};

const startWebsocket = async () => {
  connected.value = true;
  emit(EVENTS.OPEN_WEBSOCKET_EVENT, { room_id: Number(roomid.value) });
};

const listeners: any[] = [];
const currentEvent = ref("STOP");

const changeEvent = async (event: string) => {
  // 关闭所有的listener
  listeners.forEach((listener) => {
    listener();
  });

  currentEvent.value = event;
  if (event === "STOP") return;

  console.log("开始监听事件：", event);

  const cur_listner = await listen(event, (event) => {
    const data = JSON.parse(event.payload as string);
    console.log(data);
  });
  listeners.push(cur_listner);
};

const openPreview = async () => {
  await openNewWindow("/preview");
  setTimeout(() => {
    emit("preview-room", roomid.value);
  }, 2000);
};

onMounted(async () => {
  // 挂载websocket监听
  useWebsocket().trigger();
});
</script>

<template>
  <div>
    <n-h3>
      websocket测试:
      <span :class="connected ? 'text-green' : 'text-red'">{{
        connected ? "已连接" : "未连接"
      }}</span>
    </n-h3>
    <n-input
      v-model:value="roomid"
      placeholder="直播间id"
    />
    <n-button
      @click="startWebsocket"
      :disabled="connected"
    >
      开启链接
    </n-button>
    <n-button
      @click="stopWebsocket"
      :disabled="!connected"
    >
      停止链接
    </n-button>
    <n-button @click="openPreview">
      直播预览
    </n-button>
    <div class="m-4">
      <n-h3>
        正在监听事件: {{ currentEvent }}
        <n-button
          type="error"
          @click="changeEvent('STOP')"
          :disabled="currentEvent === 'STOP'"
        >
          STOP
        </n-button>
      </n-h3>

      <n-space justify-around>
        <div
          v-for="item in EVENTS"
          :key="item"
        >
          <n-button
            @click="changeEvent(item)"
            v-if="!item.includes('websocket')"
          >
            {{ item }}
          </n-button>
        </div>
      </n-space>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>