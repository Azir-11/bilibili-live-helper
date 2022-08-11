<script setup lang="ts">
import Typography from "@/components/typography/index.vue";
import { getLiveStreamApi, getLiveCodeApi } from "@/api";

defineProps({
  anchorInfo: {
    type: Object,
    required: true
  }
});

// 是否在加载中
const isLoading = ref(true);
// 线路类型
const streamType = ref("addr");
// 直播线路
const liveStream = ref<Record<string, any>>({});

const streamList = computed(() => [
  {
    label: "服务器地址",
    content: liveStream.value[streamType.value]?.addr || ""
  },
  {
    label: "串流密钥",
    content: liveStream.value[streamType.value]?.code || ""
  },
  {
    label: "身份码",
    content: liveStream.value?.code || ""
  }
]);

// 获取直播线路和身份码
const getLiveStream = async () => {
  // 获取直播线路
  const lineResult = await getLiveStreamApi();
  // 获取直播身份码
  const codeResult = await getLiveCodeApi();

  if (!lineResult || !codeResult) {
    getLiveStream();

    return;
  }

  liveStream.value = { ...lineResult, ...codeResult };

  isLoading.value = false;
};

onMounted(getLiveStream);
</script>

<template>
  <n-card embedded>
    <n-spin :show="isLoading">
      <template #description>
        正在获取直播线路和身份码
      </template>

      <div class="flex flex-col gap-5">
        <n-radio-group
          default-value="addr"
          @update-value="(value) => (streamType = value)"
        >
          <n-radio value="addr">
            rtmp 地址
          </n-radio>
          <n-radio value="srt_addr">
            srt 地址
          </n-radio>
        </n-radio-group>
        <ul class="flex flex-wrap gap-y-5">
          <li
            v-for="(item, index) in streamList"
            class="w-1/2"
            :key="index"
          >
            <Typography
              :label="item.label"
              :content="item.content"
              width="140"
            />
          </li>
        </ul>
      </div>
    </n-spin>
  </n-card>

  <n-card
    class="mt-5 overflow-hidden"
    hoverable
    :content-style="{ overflow: 'hidden', padding: 0 }"
  >
    <iframe
      style="width: 100%; height: 320px"
      :src="`https://www.bilibili.com/blackboard/live/live-activity-player.html?cid=${anchorInfo?.room_id}&quality=0`"
      frameborder="no"
      framespacing="0"
      scrolling="no"
      allow="autoplay; encrypted-media"
      allowfullscreen="true"
    />

    <div class="flex flex-col gap-4 p-4">
      <n-text>{{ anchorInfo?.title }}</n-text>
      <n-text type="primary">
        {{ anchorInfo?.parent_area_name }} · {{ anchorInfo?.area_name }}
      </n-text>
      <n-text>开播时间：{{ anchorInfo?.live_time }}</n-text>
      <div class="flex gap-4">
        <n-tag
          round
          :bordered="false"
          type="info"
          size="small"
        >
          <template #icon>
            <n-icon class="i-carbon-fire" />
          </template>
          {{ anchorInfo?.online }}人气
        </n-tag>
        <n-tag
          round
          :bordered="false"
          type="primary"
          size="small"
        >
          <template #icon>
            <n-icon class="i-carbon-view" />
          </template>
          {{ anchorInfo?.num }}人看过
        </n-tag>
      </div>
    </div>
  </n-card>
</template>