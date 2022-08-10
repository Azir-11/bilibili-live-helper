<script setup lang="ts">
import Typography from "@/components/typography/index.vue";
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

      <Typography
        linkable
        label="直播间 ID"
        content="22835031"
        :link="`${ROOM_URL_PREFIX}/22835031`"
      />

      <Typography
        linkable
        label="我的直播间链接"
        :content="`${ROOM_URL_PREFIX}/22835031`"
      />
    </n-card>

    <n-card segmented />
  </div>
</template>

<style scoped lang="scss"></style>