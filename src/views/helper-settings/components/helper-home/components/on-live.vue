<script setup lang="ts">
import { open } from "@tauri-apps/api/shell";
// import { liveDuration, anchorInfo } from "../hooks/index1";
import { copyText } from "@/utils/tauri";

defineProps(["anchorInfo"]);
</script>

<template>
  <n-card
    embedded
    hoverable
  >
    <template #cover>
      <div
        class="relative flex items-center justify-center hover:cursor-pointer"
        @click="open(anchorInfo?.live_url)"
      >
        <n-icon
          class="i-carbon-play-filled text-revert absolute z-10 text-7xl text-[#fb7299] hover:text-8xl"
        />
        <img
          :src="anchorInfo?.cover"
          class="opacity-85"
        >
      </div>
    </template>
    <template #header>
      <n-text>
        {{ anchorInfo?.title }}
      </n-text>
      <n-tag size="small">
        {{ anchorInfo?.area_name }}
      </n-tag>
    </template>
    <template #header-extra>
      <n-space justify="end">
        <n-tag
          round
          :bordered="false"
          type="error"
        >
          <template #avatar>
            <n-icon class="i-carbon-fire" />
          </template>
          {{ anchorInfo?.online }}人气
        </n-tag>

        <n-tag
          round
          :bordered="false"
          type="info"
        >
          <template #avatar>
            <n-icon class="i-carbon-view-filled" />
          </template>
          {{ anchorInfo?.num }}人看过
        </n-tag>
      </n-space>
    </template>
    <n-p v-html="anchorInfo?.description" />

    <n-space justify="space-between">
      <n-text class="text-sm">
        开播时间： {{ anchorInfo?.live_time }}
      </n-text>
      <!-- <n-text class="text-sm"> 开播时长：{{ liveDuration }} </n-text> -->
    </n-space>
    <n-input-group class="m-t-2">
      <n-input
        readonly
        placeholder="推流地址"
      />
      <n-button
        type="info"
        ghost
        @click="copyText('123213')"
      >
        复制
      </n-button>
    </n-input-group>
  </n-card>
</template>

<style lang="scss" scoped></style>