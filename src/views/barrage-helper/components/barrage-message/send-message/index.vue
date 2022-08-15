<script setup lang="ts">
import { getEmojiApi, sendMessageApi } from "@/api";
import type { SendMessage } from "@/types";

// 表情包列表
const emojiList = ref<any[]>([]);
// 输入框内容
const inputValue = ref("");
// 是否显示弹出框
const showPopover = ref(false);

// 获取表情包列表
const getEmojiList = async () => {
  const result = await getEmojiApi();
  if (!result) {
    getEmojiList();

    return;
  }
  emojiList.value = result.data;
};

// 发送信息
const sendMessage = async (value?: string) => {
  let params: SendMessage;

  if (value) {
    params = {
      dm_type: "1",
      msg: value
    };
  } else {
    const msg = inputValue.value.trim();

    if (!msg) return;

    params = {
      msg
    };
  }

  const result = await sendMessageApi({ ...params, isInitiative: true });

  if (!result) return;

  inputValue.value = "";

  showPopover.value = false;
};

onMounted(getEmojiList);
</script>

<template>
  <div
    class="send-message fixed bottom-0 flex h-[30px] w-full items-center gap-[10px] px-[10px] text-[18px]"
  >
    <span class="text-[#999]">~</span>

    <n-input
      :value="inputValue"
      maxlength="20"
      show-count
      clearable
      size="small"
      placeholder="发个弹幕呗~"
      @input="(value) => (inputValue = value)"
      @keyup.enter="sendMessage()"
    />

    <n-popover
      trigger="manual"
      :show="showPopover"
      placement="bottom-end"
      to=".send-message"
      :disabled="!emojiList.length"
    >
      <template #trigger>
        <n-icon
          class="i-ph-smiley-fill cursor-pointer text-[#999] hover:text-white"
          @click="showPopover = !showPopover"
        />
      </template>
      <n-tabs type="segment">
        <n-tab-pane
          v-for="item in emojiList"
          :name="item.pkg_name"
          :tab="item.pkg_name"
          :key="item.pkg_id"
        >
          <div
            v-for="emoji in item.emoticons"
            :key="emoji.emoticon_id"
            class="flex w-1/4 items-center p-[10px]"
          >
            <img
              :src="emoji.url"
              :alt="emoji.emoji"
              class="w-full cursor-pointer"
              @click="sendMessage(emoji.emoticon_unique)"
            >
          </div>
        </n-tab-pane>
      </n-tabs>
    </n-popover>
  </div>
</template>

<style scoped lang="scss">
@import "./index.scss";
</style>