<script setup lang="ts">
import flvjs from "flv.js";
import { listen } from "@tauri-apps/api/event";
import {
  appWindow,
  LogicalPosition,
  LogicalSize,
  currentMonitor
} from "@tauri-apps/api/window";
import { getLiveStreamUrlApi } from "@/api";
import BaseHeader from "@/components/base-operate/index.vue";

const url = ref("");
let flvPlayer = reactive<any>({});
const roomId = ref<string>("");

const volume = ref(0.5);

const changeVolume = (event: WheelEvent) => {
  const { deltaY } = event;
  const sign = deltaY > 0 ? -1 : 1;
  volume.value += sign * 0.1;
  if (volume.value > 1) {
    volume.value = 1;
  } else {
    if (volume.value < 0) {
      volume.value = 0;
    }
  }
};

const initPlayer = () => {
  if (flvjs.isSupported()) {
    const videoElement = document.getElementById("videoElement");
    flvPlayer = flvjs.createPlayer(
      {
        type: "flv",
        url: url.value,
        isLive: true
      },
      {
        enableWorker: false, // 不启用拆散线程
        enableStashBuffer: false, // 敞开IO暗藏缓冲区
        reuseRedirectedURL: true, // 重用301/302重定向url，用于随后的申请，如查找、从新连贯等。
        autoCleanupSourceBuffer: true // 主动革除缓存
      }
    );
    flvPlayer.attachMediaElement(videoElement);
    flvPlayer.load();
    flvPlayer.play();

    flvPlayer.on(flvjs.Events.LOADING_COMPLETE, (data: any) => {
      console.log("视频流停止", data);
      destryPlayer();
      initPlayer();
    });

    flvPlayer.on(flvjs.Events.ERROR, (data: any) => {
      console.log("加载失败", data);
      destryPlayer();
    });

    flvPlayer.on(flvjs.Events.MEDIA_INFO, (data: any) => {
      console.log("MEDIA_INFO", data);
    });

    videoElement!.onresize = async (val: any) => {
      const ratio = val.target.videoWidth / val.target.videoHeight;
      const monitor = await currentMonitor();
      if (!ratio) return;
      if (ratio > 1) {
        // 横屏
        appWindow.setMinSize(new LogicalSize(480, 270));
        appWindow.setSize(new LogicalSize(480, 270));
        appWindow.setPosition(
          new LogicalPosition(
            monitor!.size.width - 500,
            monitor!.size.height - 290
          )
        );
      } else {
        // 竖屏
        appWindow.setMinSize(new LogicalSize(225, 400));
        appWindow.setSize(new LogicalSize(225, 400));
        appWindow.setPosition(
          new LogicalPosition(
            monitor!.size.width - 275,
            monitor!.size.height - 420
          )
        );
      }
    };
  }
};

const destryPlayer = () => {
  if (Object.keys(flvPlayer).length) {
    // 关闭之前的流
    flvPlayer.pause();
    flvPlayer.unload();
    flvPlayer.detachMediaElement();
    flvPlayer.destroy();
    flvPlayer = null;
  }
};

watch(roomId, async () => {
  destryPlayer();
  // 加载新的流
  const res = await getLiveStreamUrlApi("10000", roomId.value);
  if (!res) return;
  url.value = res.durl[0].url;
  initPlayer();
});

onMounted(() => {
  listen<string>("preview-room", (event) => {
    roomId.value = event.payload;
  });
});
</script>

<template>
  <div
    class="preview-helper group relative flex h-full items-center justify-center bg-black/60"
    @wheel="changeVolume"
  >
    <BaseHeader class="z-99 top-0 !h-[30px]" />
    <video
      id="videoElement"
      :volume="volume"
      class="h-full w-full"
      data-tauri-drag-region
    />
  </div>
</template>

<style scoped lang="scss"></style>