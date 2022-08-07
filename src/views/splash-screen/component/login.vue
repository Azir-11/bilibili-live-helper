<script setup lang="ts">
import { UP_INFO } from "@/constants";
import { getStore } from "@/store/tauri";

const emit = defineEmits(["enterMainWindow"]);

// 头像
const avatar = ref();

// 名称
const uname = ref();

onMounted(async () => {
  avatar.value = await getStore(UP_INFO.avatar);
  uname.value = await getStore(UP_INFO.uname);
});
</script>

<template>
  <div class="h-[75px] w-[75px]">
    <n-avatar
      :src="avatar"
      round
      class="h-full w-full"
    />
  </div>
  <n-h3>{{ uname }}</n-h3>
  <n-button
    type="primary"
    color="#e1678e"
    class="mt-8"
    @click="emit('enterMainWindow')"
  >
    进入直播助手
  </n-button>
</template>

<style lang="scss" scoped></style>