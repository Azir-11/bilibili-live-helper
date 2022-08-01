<script setup lang="ts">
import AboutHelper from "./components/about-helper/index.vue";
import type { Component } from "vue";
import type { MenuOption } from "naive-ui";

// 当前选中菜单的对应组件
const currentComponent = shallowRef<Component>();

/**
 * 给菜单列表每一项设置 key
 * @param options 菜单项
 */
const setMenuOptionsKey = (options: MenuOption[]) =>
  options.map((item, index) => ({
    key: `${index}`,
    ...item,
    children: item?.children?.map((childItem, childIndex) => ({
      key: `${index}-${childIndex}`,
      ...childItem
    }))
  }));

// 菜单项
const menuOptions = setMenuOptionsKey([
  {
    label: "助手首页"
  },
  {
    label: "账户设置",
    children: [
      {
        label: "主播信息"
      },
      {
        label: "管理信息"
      }
    ]
  },
  {
    label: "弹幕助手",
    children: [
      {
        label: "弹幕设置"
      },
      {
        label: "自动回复"
      },
      {
        label: "语音播报"
      }
    ]
  },
  {
    label: "点歌助手"
  },
  {
    label: "粉丝助手"
  },
  {
    label: "时钟助手"
  },
  {
    label: "提示助手"
  },
  {
    label: "关于助手",
    component: AboutHelper
  }
]);

// 菜单的 key 发生变化
const changeMenuKey = (key: string, item: any) => {
  currentComponent.value = item.component;
};
</script>

<template>
  <div class="helper-settings h-screen">
    <n-layout
      has-sider
      class="h-full"
    >
      <n-layout-sider
        bordered
        :native-scrollbar="false"
        :width="185"
      >
        <n-menu
          default-value="0"
          :options="menuOptions"
          @update-value="changeMenuKey"
        />
      </n-layout-sider>
      <n-layout-content>
        <component
          :is="currentComponent"
          class="p-1.5"
        />
      </n-layout-content>
    </n-layout>
  </div>
</template>