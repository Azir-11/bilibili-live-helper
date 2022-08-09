// @unocss-include
import type { RouteRecordRaw } from "vue-router";

export const settingsRoutes: RouteRecordRaw[] = [
  {
    path: "",
    name: "helper-home",
    component: () =>
      import("@/views/helper-settings/components/helper-home/index.vue"),
    meta: {
      title: "助手首页",
      icon: "i-carbon-home"
    }
  },
  {
    path: "account-info",
    name: "account-info",
    meta: {
      title: "账户信息"
    },
    children: [
      {
        path: "anchor-info",
        name: "anchor-info",
        component: () =>
          import("@/views/helper-settings/components/anchor-info/index.vue"),
        meta: {
          title: "主播信息",
          icon: "i-carbon-user"
        }
      },
      {
        path: "manager-info",
        name: "manager-info",
        component: () =>
          import("@/views/helper-settings/components/manager-info/index.vue"),
        meta: {
          title: "管理信息",
          icon: "i-carbon-bot"
        }
      }
    ]
  },
  {
    path: "barrage-helper",
    name: "barrage-helper",
    meta: {
      title: "弹幕助手"
    },
    children: [
      {
        path: "barrage-settings",
        name: "barrage-settings",
        component: () =>
          import(
            "@/views/helper-settings/components/barrage-settings/index.vue"
          ),
        meta: {
          title: "助手设置",
          icon: "i-carbon-settings"
        }
      },
      {
        path: "auto-reply",
        name: "auto-reply",
        component: () =>
          import("@/views/helper-settings/components/auto-reply/index.vue"),
        meta: {
          title: "自动回复",
          icon: "i-carbon-reply"
        }
      },
      {
        path: "voice-broadcast",
        name: "voice-broadcast",
        component: () =>
          import(
            "@/views/helper-settings/components/voice-broadcast/index.vue"
          ),
        meta: {
          title: "语音播报",
          icon: "i-carbon-volume-up"
        }
      },
      {
        path: "/history-manage",
        name: "history-manage",
        component: () =>
          import("@/views/helper-settings/components/history-manage/index.vue"),
        meta: {
          title: "弹幕历史",
          icon: "i-carbon-update-now"
        }
      }
    ]
  },
  {
    path: "other-helper",
    name: "other-helper",
    component: () =>
      import("@/views/helper-settings/components/other-helper/index.vue"),
    meta: {
      title: "其它助手",
      icon: "i-carbon-tools"
    }
  },
  {
    path: "about-helper",
    name: "about-helper",
    component: () =>
      import("@/views/helper-settings/components/about-helper/index.vue"),
    meta: {
      title: "关于助手",
      icon: "i-carbon-information"
    }
  }
];