<script setup lang="ts">
import dayjs from "dayjs";
import { emit } from "@tauri-apps/api/event";
import { getMyFollowLiveInfo } from "@/api";
import { openNewWindow } from "@/utils/tauri";
import BaseHeader from "@/components/base-operate/index.vue";

const pageInfo = reactive({
  page: 1,
  count: 0
});
const roomsInfo = ref<any[]>([]);
const previewType = ref("cover");

const getRoomsInfo = async () => {
  const result = await getMyFollowLiveInfo(`${pageInfo.page}`);
  if (!result) return;
  const { rooms, count } = result;
  roomsInfo.value = rooms;
  pageInfo.count = count;
};

const handleStartTime = (time: number) => {
  return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
};

const openLive = async (room_id: number) => {
  await openNewWindow("/preview");
  setTimeout(() => {
    emit("preview-room", room_id);
  }, 2000);
};

onMounted(() => getRoomsInfo());
</script>

<template>
  <div class="rooms-helper group relative flex items-center justify-center">
    <BaseHeader class="z-99 top-0 !h-[30px]" />
    <n-space
      vertical
      class="h-full w-screen overflow-auto bg-white"
    >
      <n-list bordered>
        <template #header>
          <div class="flex h-[60px] items-end justify-between">
            <n-h3> 看直播，就在这里 </n-h3>
            <n-radio-group
              v-model:value="previewType"
              @update:value="getRoomsInfo"
              class=""
            >
              <n-radio-button
                key="cover"
                value="cover"
                label="封面"
              />
              <n-radio-button
                key="live"
                value="live"
                label="直播帧"
              />
            </n-radio-group>
          </div>
        </template>
        <template #footer>
          <n-pagination
            v-model:page="pageInfo.page"
            :item-count="pageInfo.count"
            :page-size="10"
            @update:page="getRoomsInfo"
          />
        </template>
        <n-list-item
          v-for="item in roomsInfo"
          :key="item.uid"
        >
          <template #prefix>
            <n-image
              width="240"
              :src="
                previewType === 'cover' ? item.cover_from_user : item.keyframe
              "
              preview-disabled
            />
          </template>
          <template #suffix>
            <n-button @click="openLive(item.room_id)">
              观看直播
            </n-button>
          </template>
          <n-thing>
            <div class="flex items-center gap-3">
              <n-avatar
                round
                :src="item.face"
              />
              <n-text>{{ item.uname }}</n-text>
              <n-tag
                type="info"
                size="small"
              >
                {{ item.area_v2_name }}
              </n-tag>
            </div>
            <template #header>
              <n-a
                :href="item.link"
                target="_blank"
                class="text-lg"
              >
                <n-ellipsis style="max-width: 300px">
                  {{ item.roomname }}
                </n-ellipsis>
              </n-a>
            </template>
            <template #footer>
              <n-text code>
                开播时间{{ handleStartTime(item.liveTime * 1000) }}
              </n-text>
            </template>
          </n-thing>
        </n-list-item>
      </n-list>
    </n-space>
  </div>
</template>

<style lang="scss" scoped></style>