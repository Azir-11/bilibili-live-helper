<script setup lang="ts">
import { NButton, NDynamicTags, NSwitch } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import voiceSpeech from "./voice-speech.vue";
import {
  soundConfig,
  toggleChange,
  openDir,
  playSound
} from "@/helper/initSound";
import { SoundItem } from "@/types";

// 表格列名
const createColumns = (): DataTableColumns<SoundItem> => [
  {
    title: "音效文件",
    key: "key",
    width: 120,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: "触发关键词",
    key: "keyword",
    render: (row) => keywordRender(row)
  },
  {
    title: "状态",
    key: "status",
    align: "center",
    width: 80,
    render: (row) =>
      h(NSwitch, {
        size: "small",
        value: row.status,
        onUpdateValue: (value) => {
          row.status = value;
          toggleChange();
        },
        disabled: !soundConfig.value.isOpen
      })
  },
  {
    title: "操作",
    key: "action",
    width: 80,
    align: "center",
    render: (row) =>
      h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: "small",
          onClick: () => playSound(row),
          disabled: !soundConfig.value.isOpen || !row.status
        },
        () => "播放"
      )
  }
];

const columns = ref(createColumns());

const pagination = {
  pageSize: 5
};

const keywordRender = (row: SoundItem) =>
  h(
    NDynamicTags,
    {
      size: "small",
      round: true,
      max: 3,
      disabled: !soundConfig.value.isOpen,
      closable: row.keyword.length > 1,
      value: row.keyword,
      onUpdateValue: (value: any) => {
        row.keyword = value;
        toggleChange();
      }
    },
    {
      default: () => row.keyword
    }
  );
</script>

<template>
  <div class="voice-broadcast">
    <!-- 弹幕播报 -->
    <voice-speech />

    <!-- 弹幕音效 -->
    <div class="audio-effect">
      <n-card
        size="small"
        :segmented="{
          content: true,
        }"
        class="m-t-3"
      >
        <template #header>
          <div class="flex items-center gap-3">
            <n-h3 class="m-0">
              弹幕音效
            </n-h3>
            <n-button
              size="small"
              @click="openDir"
            >
              <template #icon>
                <n-icon class="i-ph-folder-open-duotone" />
              </template>
              音效文件夹
            </n-button>
          </div>
        </template>

        <template #header-extra>
          <n-slider
            :step="10"
            class="w-25 mx-3"
            v-model:value="soundConfig.volume"
            @update:value="toggleChange"
            :disabled="!soundConfig.isOpen"
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
            v-model:value="soundConfig.isOpen"
            @update:value="toggleChange"
          />
        </template>
        <div class="content">
          <n-data-table
            striped
            size="small"
            :columns="columns"
            :data="soundConfig.files"
            :bordered="true"
            :pagination="pagination"
          />
        </div>
      </n-card>
    </div>
  </div>
</template>