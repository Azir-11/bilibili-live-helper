<script setup lang="ts">
import BaseHeader from "./components/base-header/index.vue";
import SendMessage from "./components/barrage-message/send-message/index.vue";
</script>

<template>
  <div class="barrage-helper bg-black/70 text-white">
    <!-- 公共头部 -->
    <BaseHeader />

    <!-- 发送消息 -->
    <SendMessage />
  </div>
</template>

<style scoped lang="scss"></style>