<script setup lang="ts">
import { LOADING_IMAGE } from "@/constants";

defineProps({
  width: {
    type: String,
    default: "100"
  },
  content: {
    type: String,
    default: ""
  }
});
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center">
    <img
      :src="LOADING_IMAGE"
      alt="loading"
      :style="{
        width: isNaN(Number(width)) ? width : width + 'px',
      }"
    >

    <n-h4 v-if="content">
      {{ content }}
    </n-h4>
  </div>
</template>