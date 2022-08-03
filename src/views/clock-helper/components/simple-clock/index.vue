<script setup lang='ts'>
import { timeArr, curDay, curDate, startTimer, stopTimer } from "../initClock";

onMounted(() => startTimer());

onUnmounted(() => stopTimer());
</script>

<template>
  <div class="clock-container">
    <div class="time">
      {{ timeArr[0] }}{{ timeArr[1] }}:{{ timeArr[2] }}{{ timeArr[3] }}:{{ timeArr[4] }}{{ timeArr[5] }}
    </div>

    <div class="date">
      {{ curDate }}
      {{ curDay }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>