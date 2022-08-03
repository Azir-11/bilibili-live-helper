<script setup lang="ts">
import { RouterLink } from "vue-router";
import { settingsRoutes } from "@/router/settings";
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
    console.log("item.meta?.icon", item.meta?.icon);
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
          :default-value="$route.name as string"
          :options="renderMenuOptions()"
        />
      </n-layout-sider>
      <n-layout-content>
        <RouterView v-slot="{ Component }">
          <keep-alive>
            <component
              :is="Component"
              class="p-1.5"
            />
          </keep-alive>
        </RouterView>
      </n-layout-content>
    </n-layout>
  </div>
</template>