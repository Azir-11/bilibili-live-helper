<script setup lang="ts">
import QRCode from "./component/qr-code/index.vue";
import { getStore } from "@/store/tauri";
import { closeWindow, openNewWindow } from "@/utils/tauri";
import { CDN_URL } from "@/constants/url";
import { upIsLogin } from "@/utils/auth";
import { UP_INFO } from "@/constants";

// 初始化验证登录信息
const isLogin = ref<boolean>(false);

// 头像
const avatar = ref();

// 名称
const uname = ref();

// 进入主窗口
const enterMainWindow = async () => {
  await openNewWindow("/");
  await closeWindow();
};

onMounted(async () => {
  isLogin.value = !!(await upIsLogin());
  avatar.value = await getStore(UP_INFO.avatar);
  uname.value = await getStore(UP_INFO.uname);
});

provide("enterMainWindow", enterMainWindow);
</script>

<template>
  <div class="splash-screen relative flex h-screen flex-col items-center p-10">
    <template v-if="isLogin">
      <div class="h-[75px] w-[75px]">
        <n-avatar
          :src="avatar"
          round
          class="h-full w-full"
        />
      </div>
      <n-h3>{{ uname }}</n-h3>
      <n-button
        type="primary"
        color="#e1678e"
        class="mt-8"
        @click="enterMainWindow"
      >
        进入直播助手
      </n-button>
    </template>

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
      :src="`${CDN_URL}/img/login-left.png`"
      class="img left-0"
    >
    <img
      :src="`${CDN_URL}/img/login-right.png`"
      class="img right-0"
    >
  </div>
</template>

<style scoped lang="scss">
.img {
  @apply w-30  absolute bottom-0;
}
</style>