<script setup lang="ts">
import { open } from "@tauri-apps/api/shell";

import { liveDuration, baseInfo } from "../";
</script>

<template>
  <n-card
    embedded
    hoverable
  >
    <template #cover>
      <div
        class="relative flex items-center justify-center hover:cursor-pointer"
        @click="open(baseInfo?.live_url)"
      >
        <n-icon
          class="i-carbon-play-filled text-revert absolute z-10 text-7xl text-[#fb7299] hover:text-8xl"
        />
        <img
          :src="baseInfo?.cover"
          class="opacity-85"
        >
      </div>
    </template>
    <template #header>
      <n-text>
        {{ baseInfo?.title }}
      </n-text>
      <n-tag size="small">
        {{ baseInfo?.area_name }}
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
          {{ baseInfo?.online }}人气
        </n-tag>

        <n-tag
          round
          :bordered="false"
          type="info"
        >
          <template #avatar>
            <n-icon class="i-carbon-view-filled" />
          </template>
          {{ baseInfo?.num }}人看过
        </n-tag>
      </n-space>
    </template>
    <n-text>
      {{ baseInfo?.description }}
    </n-text>

    <n-space justify="space-between">
      <n-text class="text-sm">
        开播时间： {{ baseInfo?.live_time }}
      </n-text>
      <n-text class="text-sm">
        开播时长：{{ liveDuration }}
      </n-text>
    </n-space>
  </n-card>
</template>

<style lang="scss" scoped></style>