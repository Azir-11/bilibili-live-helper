<script setup lang="ts">
import { copyText } from "@/utils/tauri";

// props 值
const props = defineProps({
  label: {
    type: String,
    default: ""
  },
  content: {
    type: String,
    required: true
  },
  copyContent: {
    type: String,
    default: ""
  },
  copyable: {
    type: Boolean,
    default: true
  },
  width: {
    type: String,
    default: "100%"
  },
  linkable: {
    type: Boolean,
    default: false
  },
  link: {
    type: String,
    default: ""
  }
  // encryptable: {
  //   type: Boolean,
  //   default: false,
  // },
});

// 是否已复制
const isCopy = ref(false);

// 复制内容
const copyContent = async () => {
  const { copyContent, content } = props;

  const result = await copyText(copyContent || content);

  if (!result) return;

  isCopy.value = true;
};

// 监听是否已复制，已复制图标 3s 变为未复制图标
watch(isCopy, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      isCopy.value = false;
    }, 1000 * 3);
  }
});
</script>

<template>
  <div class="typography flex items-center">
    <n-text depth="3">
      {{ label }}：
    </n-text>

    <n-ellipsis
      class="mr-2"
      :style="{ 'max-width': isNaN(Number(width)) ? width : width + 'px' }"
    >
      <template v-if="!linkable">
        {{ content || "正在努力获取中..." }}
      </template>
      <n-a
        :href="link || content"
        target="_blank"
        v-else
      >
        {{ content || "正在努力获取中..." }}
      </n-a>
    </n-ellipsis>

    <n-tooltip>
      <template #trigger>
        <n-icon
          class="i-carbon-copy hover:text-[var(--blue-color)] cursor-pointer"
          @click="copyContent"
          v-if="copyable && !isCopy"
        />

        <n-icon
          class="i-carbon-checkmark-filled text-[var(--green-color)]"
          v-else
        />
      </template>
      {{ isCopy ? "已复制" : "复制" }}
    </n-tooltip>
  </div>
</template>