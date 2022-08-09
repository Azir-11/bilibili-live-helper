<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ask } from "@tauri-apps/api/dialog";
import type { RouteRecordRaw } from "vue-router";
import type { MenuOption } from "naive-ui";
import { closeWindow, openNewWindow } from "@/utils/tauri";
import { settingsRoutes } from "@/router/settings";
import { APP_NAME, LOGOUT_CONFIRM } from "@/constants";
import { clearUpInfo } from "@/utils/auth";

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

// 注销登录
const logout = async () => {
  const confirm = await ask(LOGOUT_CONFIRM, APP_NAME);
  if (confirm) {
    clearUpInfo();

    await openNewWindow("/splash-screen");
  }
};

onMounted(() => closeWindow("/splash-screen"));
</script>

<template>
  <div class="helper-settings">
    <n-layout
      has-sider
      class="relative h-full"
    >
      <n-layout-sider
        bordered
        :native-scrollbar="false"
        :width="185"
      >
        <n-menu
          :value="$route.name as string"
          :options="renderMenuOptions()"
        />
        <n-icon
          class="i-carbon-logout hover:text-red absolute left-4 bottom-4 cursor-pointer text-2xl"
          @click="logout"
        />
      </n-layout-sider>
      <n-layout-content>
        <RouterView v-slot="{ Component }">
          <KeepAlive>
            <component
              :is="Component"
              class="h-full p-1.5"
            />
          </KeepAlive>
        </RouterView>
      </n-layout-content>
    </n-layout>
  </div>
</template>