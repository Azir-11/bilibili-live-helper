<script setup lang="ts"></script>

<template>
  <div class="music-helper text-white">
    <div class="h-5 bg-transparent" />
    <div
      class="music-cover z-99 absolute top-0 left-5 overflow-hidden rounded-full"
    >
      <n-avatar
        round
        :size="75"
        class="animate-[spin_8s_linear_infinite]"
      >
        歌曲图片
      </n-avatar>
      <div
        class="operate absolute top-0 left-0 flex h-full w-full items-center justify-center bg-black/60 text-2xl text-white/60 opacity-0"
      >
        <i class="i-carbon-play-filled" />
        <i class="i-carbon-play-filled-alt" />
      </div>
    </div>
    <div
      class="content relative h-full overflow-hidden rounded-xl bg-cover bg-center"
      data-tauri-drag-region
    >
      <div class="absolute z-20 h-full w-full px-4 py-5">
        <!-- 音乐信息 -->
        <div class="flex flex-col gap-2.5 pl-20 text-center">
          <!-- 音乐名称 -->
          <div class="truncate">
            平凡之路
          </div>
          <!-- 歌手 -->
          <div class="truncate">
            朴树
          </div>
        </div>

        <!-- 切歌 and 时间 -->
        <div class="mt-2.5 flex items-center justify-between gap-3">
          <span class="min-w-fit">切歌 1 / 3</span>
          <n-slider
            :tooltip="false"
            class="-translate-y-px"
          />
          <span class="min-w-fit">00:00 / 04:30</span>
        </div>

        <!-- 歌词 -->
        <div class="my-2.5 truncate text-center">
          歌词正在加载中...
        </div>

        <!-- 点歌列表 -->
        <n-carousel
          direction="vertical"
          :show-dots="false"
          autoplay
          class="h-5"
        >
          <div
            v-for="item in 10"
            :key="item"
            class="h-full text-center"
          >
            {{ item }}
          </div>
        </n-carousel>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.music-helper {
  .music-cover:hover {
    .operate {
      transition: all 0.3s;

      opacity: 1;
      i:hover {
        transition: 0.5s;

        color: #fff;
      }
    }
  }
  .content {
    &::before,
    &::after {
      position: absolute;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;

      content: "";
    }

    &::before {
      background: inherit;

      filter: blur(2px);
    }

    &::after {
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
}
</style>