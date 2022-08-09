<script setup lang="ts">
import { open } from "@tauri-apps/api/shell";
import OnLive from "./components/on-live.vue";
import OffLive from "./components/off-live.vue";
import useAnchorInfo from "./hooks";
import { HOME_URL_PREFIX, NOT_OPEN_LIVE_IMAGE } from "@/constants";
import Loading from "@/components/loading/index.vue";

const { isOpenLive, isLoading, anchorInfo } = useAnchorInfo();
</script>

<template>
  <div class="helper-home">
    <div
      class="flex h-full flex-col items-center justify-center gap-10"
      v-if="!isOpenLive"
    >
      <n-h3 class="m-0">
        你还没有开通直播间啦~
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
        @click="
          open('https://link.bilibili.com/p/center/index#/my-room/start-live')
        "
      >
        去开通直播间
      </n-button>
    </div>

    <Loading
      :width="130"
      content="正在获取直播间数据..."
      v-else-if="isLoading"
    />

    <n-card
      :bordered="false"
      v-else
    >
      <template #header>
        <n-space>
          <n-avatar
            :src="anchorInfo?.face"
            size="large"
            round
          />
          <n-space vertical>
            <n-text class="text-xl">
              <n-a
                :href="`${HOME_URL_PREFIX}/${anchorInfo?.uid}`"
                target="_blank"
              >
                {{ anchorInfo?.name }}
              </n-a>
              感谢使用本助手
            </n-text>
            <n-text
              type="info"
              class="text-sm"
            >
              当前关注 {{ anchorInfo?.follower }}
            </n-text>
          </n-space>
        </n-space>
      </template>
      <template #header-extra>
        <n-button
          type="primary"
          v-if="!anchorInfo?.liveStatus"
        >
          开启直播
        </n-button>
        <n-button
          type="info"
          v-else
        >
          正在直播
        </n-button>
      </template>
      <n-collapse-transition>
        <component :is="anchorInfo?.liveStatus ? OnLive : OffLive" />
      </n-collapse-transition>
    </n-card>
  </div>
</template>