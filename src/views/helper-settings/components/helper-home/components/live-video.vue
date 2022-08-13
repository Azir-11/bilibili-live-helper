<script setup lang="ts">
import "xgplayer";
import FlvJsPlayer from "xgplayer-flv.js";
import { getLiveStreamUrlApi } from "@/api";

const props = defineProps({
  cover: {
    type: String,
    required: true
  }
});

onMounted(async () => {
  const result = await getLiveStreamUrlApi();
  if (!result) return;
  const { quality_description } = result;

  // 清晰度列表
  const clarityList: any[] = [];

  for (const item of quality_description) {
    const result = await getLiveStreamUrlApi(item.qn.toString());
    if (!result) return;

    const { durl } = result;

    clarityList.push({
      qn: item.qn,
      name: item.desc,
      url: durl[0].url
    });
  }

  const player = new FlvJsPlayer({
    id: "xg-player",
    lang: "zh-cn",
    url: clarityList.at(-1).url,
    poster: props.cover,
    volume: 0.1,
    isLive: true,
    playsinline: true,
    autoplay: true,
    width: "100%",
    height: "100%",
    pip: true
  });

  player.emit("resourceReady", clarityList);
});
</script>

<template>
  <div
    class="live-video h-[320px]"
    id="xg-player"
  />
</template>