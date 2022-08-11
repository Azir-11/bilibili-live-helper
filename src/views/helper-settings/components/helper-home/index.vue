<script setup lang="ts">
import { open } from "@tauri-apps/api/shell";
import OnLive from "./components/on-live.vue";
import OffLive from "./components/off-live.vue";
import useAnchorInfo from "@/hooks/useAnchorInfo";
import Loading from "@/components/loading/index.vue";
import {
  HOME_URL_PREFIX,
  NOT_OPEN_LIVE_IMAGE,
  ROOM_INFO_URL
} from "@/constants";

const { isLoading, isOpenLive, hasRoomId, anchorInfo, changeLiveStatus } =
  useAnchorInfo();

// 错误标题
const errorTitle = computed(() =>
  hasRoomId.value
    ? "获取直播间信息失败，请检查网络设置或刷新重试~"
    : "你还没有开通直播间啦~"
);

// 错误按钮信息
const errorButton = computed(() =>
  hasRoomId.value ? "刷新页面" : "去开通直播间"
);

// 错误的按钮事件
const onError = () => {
  if (hasRoomId.value) {
    window.location.reload();
  } else {
    open(ROOM_INFO_URL);
  }
};
</script>

<template>
  <div class="helper-home">
    <div
      class="flex h-full flex-col items-center justify-center gap-10"
      v-if="!isOpenLive"
    >
      <n-h3 class="m-0">
        {{ errorTitle }}
      </n-h3>
      <div class="text-0 h-[240px] w-[240px]">
        <img
          :src="NOT_OPEN_LIVE_IMAGE"
          alt="not-live"
          class="w-full"
        >
      </div>
      <n-button
        type="info"
        size="large"
        @click="onError"
      >
        {{ errorButton }}
      </n-button>
    </div>

    <Loading
      width="130"
      content="正在获取直播间数据..."
      v-else-if="isLoading"
    />

    <template v-else>
      <div class="mb-5 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <n-avatar
            :src="anchorInfo?.face"
            :size="70"
            round
          />
          <div class="flex flex-col gap-2">
            <n-a
              :href="`${HOME_URL_PREFIX}/${anchorInfo?.uid}`"
              target="_blank"
              class="text-5 font-bold"
            >
              {{ anchorInfo?.name }}
            </n-a>

            <n-text class="text-sm">
              当前粉丝
              <n-number-animation :to="anchorInfo?.follower" />
            </n-text>
          </div>
        </div>

        <n-button
          :type="anchorInfo?.liveStatus ? 'info' : 'primary'"
          @click="changeLiveStatus"
        >
          {{ anchorInfo?.liveStatus ? "关闭直播" : "开启直播" }}
        </n-button>
      </div>

      <component
        :is="anchorInfo?.liveStatus ? OnLive : OffLive"
        :anchor-info="anchorInfo"
      />
    </template>
  </div>
</template>