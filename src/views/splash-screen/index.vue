<script setup lang="ts">
import QRCode from "./qr-code.vue";
import { closeWindow, openNewWindow } from "@/utils/tauri";
import { upIsLogin, clearUpInfo } from "@/utils/auth";
import {
  UP_INFO,
  IMAGE_CDN_URL,
  LOADING_IMAGE,
  DEFAULT_AVATAR,
  APP_NAME
} from "@/constants";
import { getStore } from "@/store/tauri";
import { validateLoginInfoApi } from "@/api";
import { NaiveMessage } from "@/utils/navie";

// 初始化获取登录信息
const hasLoginInfo = ref<boolean>(!!(await upIsLogin()));

// 头像
const avatar = ref((await getStore(UP_INFO.avatar)) || DEFAULT_AVATAR);

// 名称
const uname = ref((await getStore(UP_INFO.uname)) || APP_NAME);

// 进入主窗口
const enterMainWindow = () => openNewWindow("/");

// 切换账户
const switchAccount = () => {
  clearUpInfo();

  hasLoginInfo.value = false;
};

// 验证登录信息
const validateLoginInfo = async () => {
  const result = await validateLoginInfoApi();

  if (result.code) {
    switchAccount();

    NaiveMessage.error("登录信息已过期，请重新扫码登录");

    return;
  }

  enterMainWindow();
};

onMounted(() => {
  closeWindow("/");
});

provide("enterMainWindow", enterMainWindow);
</script>

<template>
  <div class="splash-screen relative flex h-screen flex-col items-center p-11">
    <template v-if="hasLoginInfo">
      <div class="h-[75px] w-[75px]">
        <n-avatar
          :src="avatar"
          round
          class="h-full w-full"
        />
      </div>
      <n-h4>{{ uname }}</n-h4>
      <n-button
        type="info"
        class="mt-8"
        @click="validateLoginInfo"
      >
        进入直播助手
      </n-button>
      <span
        class="text-[var(--blue-color)] mt-6 cursor-pointer"
        @click="switchAccount"
      >
        切换帐号
      </span>
    </template>

    <div
      class="w-full text-center"
      v-else-if="hasLoginInfo === undefined"
    >
      <img
        :src="LOADING_IMAGE"
        class="w-[50%]"
      >
      <n-h4>正在初始化数据...</n-h4>
    </div>

    <template v-else>
      <n-h4 class="m-0">
        扫码登录
      </n-h4>
      <QRCode />
      <n-p class="m-0">
        请使用哔哩哔哩手机客户端
      </n-p>
    </template>

    <img
      :src="`${IMAGE_CDN_URL}/login-left.png`"
      class="img left-0"
    >
    <img
      :src="`${IMAGE_CDN_URL}/login-right.png`"
      class="img right-0"
    >
  </div>
</template>

<style scoped lang="scss">
.splash-screen {
  .img {
    @apply w-30  absolute bottom-0;
  }
}
</style>