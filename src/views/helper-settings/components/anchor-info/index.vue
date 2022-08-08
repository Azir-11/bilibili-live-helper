<script setup lang="ts">
import { copyText } from "@/utils/tauri";
import { ROOM_URL_PREFIX } from "@/constants";
</script>

<template>
  <div class="anchor-info flex flex-col gap-[20px]">
    <n-card
      segmented
      size="small"
    >
      <template #header>
        <div class="flex items-center gap-[10px]">
          <n-avatar
            :size="50"
            round
          />
          阿阳热爱前端
        </div>
      </template>

      <n-p>
        直播间 ID：<n-a
          :href="`${ROOM_URL_PREFIX}/22835031`"
          target="_blank"
        >
          22835031
        </n-a>
        <n-a
          @click="copyText('22835031')"
          class="pl-10"
        >
          复制ID
        </n-a>
      </n-p>
      <n-p>
        我的直播间链接：<n-a
          :href="`${ROOM_URL_PREFIX}/22835031`"
          target="_blank"
        >
          {{ ROOM_URL_PREFIX }}/22835031
        </n-a>
        <n-a
          @click="copyText(`${ROOM_URL_PREFIX}/22835031`)"
          class="pl-10"
        >
          复制链接
        </n-a>
      </n-p>
    </n-card>

    <n-card segmented />
  </div>
</template>

<style scoped lang="scss"></style>