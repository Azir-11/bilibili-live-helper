<script setup lang="ts">
import { closeWindow, openNewWindow } from "@/utils/tauriApi.js";

const close = async () => {
  await openNewWindow("/");
  await closeWindow();
};
</script>

<template>
  <n-space>
    <n-button @click="close">
      close
    </n-button>
  </n-space>
</template>

<style lang="scss" scoped></style>