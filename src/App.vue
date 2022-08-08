<script setup lang="ts">
import { appWindow } from "@tauri-apps/api/window";
import { invoke } from "@tauri-apps/api/tauri";
import type { GlobalThemeOverrides } from "naive-ui";
import { initStore } from "@/store/tauri";

// 自定义主题
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: "#28ade3",
    primaryColorHover: "#6fbfe5",
    primaryColorPressed: "#65aae0",
    primaryColorSuppl: "#6fbfe5",

    infoColor: "#ed7099",
    infoColorHover: "#f092af",
    infoColorPressed: "#d75784",
    infoColorSuppl: "#f092af"
  }
};

onMounted(async () => {
  // 初始化 store 数据
  initStore();

  // 调用窗口 close 事件时触发，如果是 main 窗口，仅进行隐藏操作
  await appWindow.onCloseRequested(async (event) => {
    if (event.windowLabel === "main") {
      event.preventDefault();
      await appWindow.hide();
    }
  });

  // 打开devtools，仅在开发环境调用
  import.meta.env.DEV && invoke("open_devtools");
});
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <RouterView class="h-screen overflow-hidden rounded-xl" />
  </n-config-provider>
</template>