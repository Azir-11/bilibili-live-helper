<script setup lang="ts">
import { closeWindow } from "@/utils/tauri";
import FlipClock from "./components/flip-clock/index.vue";
import SimpleClock from "./components/simple-clock/index.vue";

const clock = shallowRef(null);

// TODO 引进配置文件后，这里需要改成从配置文件中读取
onMounted(async () => {
  const name = "FlipClock";
  changeClock(name);
});

const changeClock = (newClock: string) => {
  const lookup: any = {
    FlipClock,
    SimpleClock
  };
  clock.value = lookup[newClock];
};
</script>

<template>
  <div class="clock-helper">
    <div
      class="title-bar"
      data-tauri-drag-region
    >
      <n-button @click="changeClock('FlipClock')">
        翻页时钟
      </n-button>
      <n-button @click="changeClock('SimpleClock')">
        简单
      </n-button>
      <n-button
        class="i-carbon-close-outline text-red text-xl"
        @click="closeWindow()"
      />
    </div>

    <div class="content">
      <component
        :is="clock"
        trigger
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.clock-helper {
  height: 100vh;

  .title-bar {
    @apply hover: rounded-lg bg-gray-500 opacity-0 hover:flex hover:cursor-pointer hover:items-center hover:justify-around hover:text-gray-200 hover:opacity-75;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>