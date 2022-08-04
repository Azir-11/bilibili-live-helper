<script setup lang="ts">
import dayjs from "dayjs";

const options = [
  {
    label: "当月打卡",
    value: "25天"
  },
  {
    label: "当月时长",
    value: "100小时"
  },
  {
    label: "当月流水",
    value: "¥12000"
  },
  {
    label: "舰长",
    value: "200"
  }
];
</script>

<template>
  <n-card>
    <n-grid :cols="options.length">
      <n-gi
        v-for="item of options"
        :key="item.label"
      >
        <n-statistic
          :label="item.label"
          :value="item.value"
        />
      </n-gi>
    </n-grid>
    <template #footer>
      截止到 {{ dayjs().format("YYYY-MM-DD") }}
    </template>
  </n-card>
</template>

<style lang="scss" scoped></style>