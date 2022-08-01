<script setup lang="ts">
import { openNewWindow } from "@/utils/tauriApi";
</script>

<template>
  <div class="helper-settings">
    helper-settings

    <n-button @click="openNewWindow('/barrage')">
      打开弹幕姬
    </n-button>
    <n-button @click="openNewWindow('/fans')">
      打开粉丝姬
    </n-button>
    <n-button @click="openNewWindow('/music')">
      打开音乐姬
    </n-button>
    <n-button @click="openNewWindow('/clock')">
      打开时钟姬
    </n-button>
    <n-button @click="openNewWindow('/prompt')">
      打开提示姬
    </n-button>
    <n-button @click="openNewWindow('/websocket')">
      开启直播连接
    </n-button>
  </div>
</template>

<style scoped lang="scss"></style>