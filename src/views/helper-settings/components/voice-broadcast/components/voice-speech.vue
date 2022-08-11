<script setup lang="ts">
import { voiceList, speechConfig, toggleChange } from "@/helper/voiceSpeech";
</script>

<template>
  <n-card
    title="语音播报"
    :segmented="{
      content: true,
      footer: 'soft'
    }"
  >
    <template #header-extra>
      <n-slider
        :step="10"
        class="w-25 mx-3"
        v-model:value="speechConfig.volume"
        @update:value="toggleChange"
        :disabled="!speechConfig.isOpen"
      >
        <template #thumb>
          <n-icon-wrapper
            :size="18"
            :border-radius="12"
          >
            <n-icon
              :size="12"
              class="i-carbon-volume-up"
            />
          </n-icon-wrapper>
        </template>
      </n-slider>
      <n-switch
        :round="false"
        v-model:value="speechConfig.isOpen"
        @update:value="toggleChange"
      />
    </template>
    <n-space
      justify="space-between"
      align="center"
    >
      <n-popselect
        trigger="hover"
        :options="voiceList"
        v-model:value="speechConfig.speechVoice"
        scrollable
        @update:value="toggleChange"
        :disabled="!speechConfig.isOpen"
      >
        <n-button
          class="w-35"
          tertiary
          circle
          icon-placement="right"
        >
          <template #icon>
            <n-icon class="i-carbon-down-to-bottom" />
          </template>
          {{ speechConfig.speechVoice || "请选择语音包" }}
        </n-button>
      </n-popselect>
      <div>
        <n-text> 弹幕 </n-text>
        <n-switch
          v-model:value="speechConfig.onDanmu"
          @update:value="toggleChange"
          :disabled="!speechConfig.isOpen"
        />
      </div>
      <div>
        <n-text> 礼物 </n-text>
        <n-switch
          v-model:value="speechConfig.onGift"
          @update:value="toggleChange"
          :disabled="!speechConfig.isOpen"
        />
      </div>
      <div>
        <n-text> 进场信息 </n-text>
        <n-switch
          v-model:value="speechConfig.onWelcome"
          @update:value="toggleChange"
          :disabled="!speechConfig.isOpen"
        />
      </div>
    </n-space>
    <n-space
      justify="end"
      class="m-t-5"
    >
      <n-text code>
        * 目前只支持系统自带的中文语音包，自定义语音包功能尽请期待🤔
      </n-text>
    </n-space>
  </n-card>
</template>

<style lang="scss" scoped></style>