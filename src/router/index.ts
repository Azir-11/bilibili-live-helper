import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import type { WindowOptions } from "@tauri-apps/api/window";
import { settingsRoutes } from "./settings";
import HelperSettings from "@/views/helper-settings/index.vue";
import type { Route } from "@/types/router";
import { getAvailWidth, getAvailHeight } from "@/utils/window";

const commonTitle = "直播助手-";

const commonOption: WindowOptions = {
  resizable: false,
  fullscreen: false,
  maximized: false,
  decorations: false,
  transparent: true
};

export const routes: Route[] = [
  {
    path: "/",
    name: "main",
    component: HelperSettings,
    children: settingsRoutes,
    meta: {
      tauriOption: {
        title: "哔哩哔哩-直播助手",
        alwaysOnTop: true,
        theme: "light"
      }
    }
  },
  {
    path: "/splash-screen",
    name: "splash-screen;",
    component: () => import("@/views/splash-screen/index.vue"),
    meta: {
      tauriOption: {
        title: "登录",
        alwaysOnTop: true,
        width: 340,
        height: 400,
        resizable: false,
        maximized: false,
        fullscreen: false,
        theme: "light"
      }
    }
  },
  {
    path: "/barrage",
    name: "barrage",
    component: () => import("@/views/barrage-helper/index.vue"),
    meta: {
      tauriOption: {
        title: commonTitle + "弹幕姬",
        center: true,
        width: 360,
        height: 420,
        ...commonOption
      }
    }
  },
  {
    path: "/fans",
    name: "fans",
    component: () => import("@/views/fans-helper/index.vue"),
    meta: {
      tauriOption: {
        title: commonTitle + "粉丝姬",
        x: 0,
        y: 0,
        width: 500,
        height: 260,
        ...commonOption
      }
    }
  },
  {
    path: "/music",
    name: "music",
    component: () => import("@/views/music-helper/index.vue"),
    meta: {
      tauriOption: {
        title: commonTitle + "音乐姬",
        x: 0,
        y: getAvailHeight() - 170,
        width: 400,
        height: 170,
        alwaysOnTop: true,
        ...commonOption
      }
    }
  },
  {
    path: "/prompt",
    name: "prompt",
    component: () => import("@/views/prompt-helper/index.vue"),
    meta: {
      tauriOption: {
        title: commonTitle + "提示姬",
        x: getAvailWidth() - 350,
        y: 0,
        width: 350,
        height: 450,
        ...commonOption
      }
    }
  },
  {
    path: "/clock",
    name: "clock",
    component: () => import("@/views/clock-helper/index.vue"),
    meta: {
      tauriOption: {
        title: commonTitle + "时钟姬",
        x: getAvailWidth() - 500,
        y: getAvailHeight() - 200,
        width: 500,
        height: 200,
        ...commonOption
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes as RouteRecordRaw[]
});

export default router;