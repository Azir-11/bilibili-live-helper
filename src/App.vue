<script setup lang="ts">
import { appWindow } from "@tauri-apps/api/window";
import { invoke } from "@tauri-apps/api/tauri";
import { initStore } from "@/store/tauri";

// 调用窗口 close 事件时触发，如果是 main 窗口，仅进行隐藏操作
onMounted(async () => {
  // 初始化 store 数据
  initStore();

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
  <RouterView class="h-screen overflow-hidden rounded-xl" />
</template>