<script setup lang="ts">
import {
  openNewWindow,
  setWindowOnTop,
  minimizeWindow,
  closeWindow
} from "@/utils/tauri";
import { getStore, setStore } from "@/store/tauri";
import { IS_TOP } from "@/constants";
import type { operateIconItem } from "@/types";
import type { Path } from "@/types/router";

// 路由地址
const path = useRoute().path as Path;

// 是否置顶
const isTop = ref(!!(await getStore(IS_TOP[path])));

// 操作图标列表
const operateIconList = computed<operateIconItem[]>(() => [
  {
    title: "设置",
    iconClass: "i-ph-gear-bold",
    clickEvent: () => openNewWindow("/")
  },
  // TODO: 穿透 i-ph-crosshair-simple-bold
  {
    title: isTop.value ? "取消置顶" : "置顶",
    iconClass: "i-ph-push-pin-bold",
    active: isTop.value,
    clickEvent: () => {
      isTop.value = !isTop.value;

      setWindowOnTop(isTop.value);

      setStore(IS_TOP[path], isTop.value);
    }
  },
  {
    title: "最小化",
    iconClass: "i-ph-minus-bold",
    clickEvent: minimizeWindow
  },
  {
    title: "关闭",
    iconClass: "i-ph-x-bold",
    clickEvent: () => closeWindow()
  }
]);

onMounted(() => setWindowOnTop(isTop.value));
</script>

<template>
  <div
    class="base-operate absolute top-0 left-0 flex h-full w-full cursor-move items-center justify-end gap-3 rounded-t-xl bg-black/80 px-[10px] opacity-0 group-hover:opacity-100"
    data-tauri-drag-region
  >
    <n-tooltip
      v-for="(item, index) in operateIconList"
      :key="index"
    >
      <template #trigger>
        <n-icon
          :class="[item.iconClass, item.active && 'active']"
          @click="item.clickEvent"
        />
      </template>
      {{ item.title }}
    </n-tooltip>
  </div>
</template>

<style scoped lang="scss">
.base-operate {
  transition: all 0.3s;
  ::v-deep(.n-icon) {
    @apply cursor-pointer text-[17px] text-[#999] hover:text-[#fff];
    &.active {
      @apply text-[var(--blue-color)];
    }
    &.i-ph-minus-bold,
    &.i-ph-x-bold {
      @apply text-[18px];
    }
    &.i-ph-x-bold:hover {
      @apply text-[var(--red-color)];
    }
  }
}
</style>