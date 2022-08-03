<script setup lang="ts">
import { openNewWindow } from "@/utils/tauriApi";
</script>

<template>
  <div class="other-helper">
    <n-button @click="openNewWindow('/clock')">
      时钟姬
    </n-button>
  </div>
</template>

<style scoped lang="scss"></style>