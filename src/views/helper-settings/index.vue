<script setup lang="ts">
import { RouterLink } from "vue-router";
import { settingsRoutes } from "@/router/settings";
import { appWindow } from "@tauri-apps/api/window";
import type { RouteRecordRaw } from "vue-router";
import type { MenuOption } from "naive-ui";

const $route = useRoute();

/**
 * 返回 naive-ui 所需菜单项
 * @param routes 路由列表
 */
const renderMenuOptions = (routes: RouteRecordRaw[] = settingsRoutes) => {
  const options: MenuOption[] = [];

  routes.forEach((item) => {
    const option: MenuOption = {
      key: item.name as string,
      type: item.children && "group",
      icon: () => h("i", { class: item.meta?.icon })
    };

    if (item.children) {
      option.label = item.meta?.title;
      option.children = renderMenuOptions(item.children);
    } else {
      option.label = () =>
        h(
          RouterLink,
          {
            to: {
              name: item.name
            }
          },
          {
            default: () => item.meta?.title
          }
        );
    }

    options.push(option);
  });
  return options;
};

// 调用窗口 close 事件时触发，如果是 main 窗口，仅进行隐藏操作
onMounted(async () => {
  await appWindow.onCloseRequested(async (event) => {
    if (event.windowLabel === "main") {
      event.preventDefault();

      appWindow.hide();
    }
  });
});
</script>

<template>
  <div class="helper-settings">
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
          :default-value="$route.name as string"
          :options="renderMenuOptions()"
        />
      </n-layout-sider>
      <n-layout-content>
        <RouterView v-slot="{ Component }">
          <KeepAlive>
            <component
              :is="Component"
              class="p-1.5"
            />
          </KeepAlive>
        </RouterView>
      </n-layout-content>
    </n-layout>
  </div>
</template>