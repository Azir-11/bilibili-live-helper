<script setup lang="ts">
import { getBaseInfo, baseInfo, liveStatus, changeLiveStatus } from ".";
import { HOME_URL_PREFIX } from "@/constants";

import OnLive from "./components/on-live.vue";
import OffLive from "./components/off-live.vue";

let timer: ReturnType<typeof setInterval>;

onMounted(async () => {
  getBaseInfo();
  if (timer) clearInterval(timer);
  timer = setInterval(() => getBaseInfo(), 1000 * 30);
});

onUnmounted(() => clearInterval(timer));
</script>

<template>
  <div class="helper-home">
    <n-card :bordered="false">
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