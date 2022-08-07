<script setup lang="ts">
import QRCode from "./component/QRCode.vue";
import { getStore } from "@/store/tauri";
import { closeWindow, openNewWindow } from "@/utils/tauri";
import { CDN_URL } from "@/constants/url";

const close = async () => {
  await openNewWindow("/");
  await closeWindow();
};

// 获取保存的账号信息
const getAccountInfo = async () => {
  const info = await getStore("UP_INFO");
  console.log("info", info);
  // TODO 验证crsf是否失效，是不是有API可以验证
  const isValid = false;
  isValid && close();
};

onMounted(() => {
  getAccountInfo();
});
</script>

<template>
  <div class="relative">
    <n-space
      justify="center"
      align="center"
      vertical
      class="h-full"
    >
      <n-h3>扫描二维码登陆</n-h3>
      <QRCode
        class="-z-1 h-40 w-40"
        @checked="getAccountInfo"
      />
      <n-p> 请使用哔哩哔哩客户端 </n-p>
      <n-gradient-text
        type="info"
        :size="18"
        @click="close"
      >
        扫码登录
      </n-gradient-text>
    </n-space>
    <img
      :src="`${CDN_URL}/img/login-left.png`"
      class="w-30 absolute left-0 bottom-0"
    >
    <img
      :src="`${CDN_URL}/img/login-right.png`"
      class="w-30 absolute right-0 bottom-0"
    >
  </div>
</template>

<style scoped lang="scss"></style>