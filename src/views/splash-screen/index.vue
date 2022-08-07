<script setup lang="ts">
import QRCode from "./component/qr-code.vue";
import Login from "./component/login.vue";
import { hideWindow, openNewWindow } from "@/utils/tauri";
import { upIsLogin } from "@/utils/auth";
import { CDN_URL } from "@/constants/url";

// 初始化验证登录信息
const loginStatus = ref<boolean>();

const laadingShow = ref<boolean>(true);

watch(loginStatus, () => (laadingShow.value = false));

// 进入主窗口
const enterMainWindow = async () => {
  await hideWindow();
  await openNewWindow("/main");
};

onMounted(async () => {
  loginStatus.value = await upIsLogin();
  // TODO 这里需要增加一个定时器，去判断保存的信息是否已过期，可以间隔长一点5分钟一次
});
</script>

<template>
  <div class="splash-screen p-15 relative flex h-screen flex-col items-center">
    <img
      :src="`${CDN_URL}/img/loading.gif`"
      alt="logo"
      v-if="laadingShow"
    >
    <component
      :is="loginStatus ? Login : QRCode"
      @enter-main-window="enterMainWindow"
      v-else
    />

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