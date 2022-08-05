<script setup lang="ts">
import { appWindow } from "@tauri-apps/api/window";
import { initStore } from "@/store/tauri";
import { initFonts } from "@/store/tauri/font";

// 调用窗口 close 事件时触发，如果是 main 窗口，仅进行隐藏操作
onMounted(async () => {
  // 初始化 store 数据
  initStore();

  // 初始化字体文件
  initFonts();

  await appWindow.onCloseRequested(async (event) => {
    if (event.windowLabel === "main") {
      event.preventDefault();

      appWindow.hide();
    }
  });
});
</script>

<template>
  <RouterView class="h-screen overflow-hidden rounded-xl" />
</template>