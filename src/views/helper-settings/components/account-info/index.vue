<script setup lang="ts">
// 是否为主播
const isAnchor = ref<boolean>(true);

watch(
  useRoute(),
  (new1) => {
    isAnchor.value = !!new1?.meta?.isAnchor;
  },
  {
    immediate: true
  }
);
</script>

<template>
  <div class="account-info">
    {{ isAnchor ? "主播信息" : "管理信息" }}
  </div>
</template>

<style scoped lang="scss"></style>