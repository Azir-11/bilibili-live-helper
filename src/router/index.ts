import { createRouter, createWebHistory } from "vue-router";
import HelperSettings from "@/views/helper-settings/index.vue";
import type { RouteRecordRaw } from "vue-router";
import type { Route } from "@/types/router";

const routes: Route[] = [
  {
    path: "/",
    name: "settings",
    component: HelperSettings
  },
  {
    path: "/barrage",
    name: "barrage",
    component: () => import("@/views/barrage-helper/index.vue")
  },
  {
    path: "/fans",
    name: "fans",
    component: () => import("@/views/fans-helper/index.vue")
  },
  {
    path: "/music",
    name: "music",
    component: () => import("@/views/music-helper/index.vue")
  },
  {
    path: "/prompt",
    name: "prompt",
    component: () => import("@/views/prompt-helper/index.vue")
  },
  {
    path: "/clock",
    name: "clock",
    component: () => import("@/views/clock-helper/index.vue")
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes as RouteRecordRaw[]
});

export default router;