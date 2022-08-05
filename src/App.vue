<script setup lang="ts">
import { appWindow } from "@tauri-apps/api/window";
import { initStore } from "@/store/tauri";
// 调用窗口 close 事件时触发，如果是 main 窗口，仅进行隐藏操作
onMounted(async () => {
  initStore();
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