<script setup lang="ts">
import { openNewWindow } from "@/utils/tauriApi";
</script>

<template>
  <div class="other-helper">
    <n-button @click="openNewWindow('/clock')">
      时钟姬
    </n-button>
    <n-button @click="openNewWindow('/fans')">
      粉丝姬
    </n-button>
    <n-button @click="openNewWindow('/music')">
      音乐姬
    </n-button>
  </div>
</template>

<style scoped lang="scss"></style>