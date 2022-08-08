<script setup lang="ts">
import { emit } from "@tauri-apps/api/event";
import { open } from "@tauri-apps/api/shell";
import OnLive from "./components/on-live.vue";
import OffLive from "./components/off-live.vue";
import { getBaseInfo, baseInfo, liveStatus, changeLiveStatus } from ".";
import {
  HOME_URL_PREFIX,
  FANS_COUNT_EVENT,
  NOT_OPEN_LIVE_IMAGE
} from "@/constants";
import { getFansApi, getUserInfoApi } from "@/api";
import Loading from "@/components/loading/index.vue";

// 是否在加载中
const isLoading = ref(true);

// 是否开通直播间
const isOpenLive = ref(true);

// 主播信息
const anchorInfo = ref<Record<string, any>>({});

// 获取粉丝
const getFans = async () => {
  const result = await getFansApi();
  if (!result) return;

  const follower = result.follower;
  anchorInfo.value = { ...anchorInfo.value, follower };
  // 发布消息
  emit(FANS_COUNT_EVENT, follower);
  // 每 6s 调一次
  // setTimeout(getFans, 1000 * 10);
};

onMounted(async () => {
  await getFans();
  getBaseInfo();
  // 获取 up 基本信息
  const result = await getUserInfoApi();
  if (!result) return;
  // const {
  //   // name,
  //   // face,
  //   // live_room: {
  //   //   roomid,
  //   //   watched_show: { num },
  //   // },
  // } = result;
  isLoading.value = false;
});
</script>

<template>
  <div class="helper-home">
    <div
      class="flex h-full flex-col items-center justify-center gap-10"
      v-if="isOpenLive"
    >
      <n-h3 class="m-0">
        你还没有开通直播间啦~
      </n-h3>
      <img
        :src="NOT_OPEN_LIVE_IMAGE"
        class="w-[240px]"
      >
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
      v-if="isLoading"
    />

    <n-card
      :bordered="false"
      v-else
    >
      <template #header>
        <n-space>
          <n-avatar
            :src="baseInfo?.face"
            size="large"
            round
          />
          <n-space vertical>
            <n-text class="text-xl">
              欢迎回来
              <a
                :href="`${HOME_URL_PREFIX}/${baseInfo?.uid}`"
                target="_blank"
                class="!text-blue"
              >{{ baseInfo?.name }}</a>
            </n-text>
            <n-text
              type="info"
              class="text-sm"
            >
              当前关注 {{ baseInfo?.attention }}
            </n-text>
          </n-space>
        </n-space>
      </template>
      <template #header-extra>
        <n-tag
          round
          :bordered="false"
          type="error"
          size="large"
          class="cursor-pointer"
          @click="changeLiveStatus"
        >
          {{ liveStatus ? "正在直播" : "开启直播" }}
        </n-tag>
      </template>
      <n-collapse-transition>
        <component :is="liveStatus ? OnLive : OffLive" />
      </n-collapse-transition>
    </n-card>
  </div>
</template>

<style scoped lang="scss"></style>