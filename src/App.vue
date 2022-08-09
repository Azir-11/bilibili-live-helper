<script setup lang="ts">
import type { GlobalThemeOverrides } from "naive-ui";
import { initStore } from "@/store/tauri";

// 自定义主题颜色
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
});
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <RouterView
      class="h-screen overflow-hidden rounded-xl"
      @contextmenu.prevent
    />
  </n-config-provider>
</template>