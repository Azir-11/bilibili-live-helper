<script setup lang='ts'>
const props = defineProps({
  total: {
    type: Number,
    default: 9
  },
  current: {
    type: Number,
    default: -1
  }
});

const before = ref(props.total === props.current ? -1 : props.total);
const isPlay = ref(false);

const current = computed(() => {
  return props.current;
});

watch(current, (_newValue, oldValue) => {
  before.value = oldValue;
  isPlay.value = true;
});
</script>

<template>
  <div :class="{ play: isPlay }">
    <ul class="flip">
      <li
        class="item"
        v-for="(item, key) in total + 1"
        :class="{ active: current === key, before: key === before }"
        :key="item"
      >
        <div class="up">
          <div class="shadow" />
          <div class="inn">
            {{ key }}
          </div>
        </div>
        <div class="down">
          <div class="shadow" />
          <div class="inn">
            {{ key }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>