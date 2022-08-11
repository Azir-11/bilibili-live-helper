<script setup lang="ts">
import Typography from "@/components/typography/index.vue";
import { useAnchorInfoStore } from "@/store/pinia/anchorInfo";

const { anchorInfo } = storeToRefs(useAnchorInfoStore());
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
            :src="anchorInfo?.face"
            :size="50"
            round
          />
          {{ anchorInfo?.name }}
        </div>
      </template>

      <Typography
        linkable
        label="直播间 ID"
        :content="anchorInfo?.roomid"
        :link="anchorInfo?.live_url"
      />

      <Typography
        linkable
        label="我的直播间链接"
        :content="anchorInfo?.live_url"
      />
    </n-card>

    <n-card segmented />
  </div>
</template>

<style scoped lang="scss"></style>