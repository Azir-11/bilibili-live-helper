<script setup lang='ts'>
import { timeArr, startTimer, stopTimer } from "../initClock";
import FlipItem from "./flip-item/index.vue";

onMounted(() => startTimer());

onUnmounted(() => stopTimer());

</script>

<template>
  <div class="clock-container">
    <flip-item
      :total="2"
      :current="timeArr[0]"
    />
    <flip-item
      :total="9"
      :current="timeArr[1]"
    />
    <div class="colon" />
    <flip-item
      :total="5"
      :current="timeArr[2]"
    />
    <flip-item
      :total="9"
      :current="timeArr[3]"
    />
    <div class="colon" />
    <flip-item
      :total="5"
      :current="timeArr[4]"
    />
    <flip-item
      :total="9"
      :current="timeArr[5]"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>