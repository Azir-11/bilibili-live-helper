<script setup lang='ts'>
import { closeWindow } from "@/utils/tauriApi";
import FlipClock from "./components/flip-clock/index.vue";
import SimpleClock from "./components/simple-clock/index.vue";

const clock = shallowRef(null);

// TODO 引进配置文件后，这里需要改成从配置文件中读取
onMounted(async () => {
  const name = "FlipClock";
  changeClock(name);
});

const changeClock = (newClock: string) => {
  console.log("newClock", newClock);
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
        class="i-carbon-close-outline text-xl text-red"
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
    @apply opacity-0 rounded-lg hover: bg-gray-500 hover:opacity-75 hover:flex hover:justify-around hover:items-center hover:text-gray-200 hover:cursor-pointer;
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
  }

}
</style>