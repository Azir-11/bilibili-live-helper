import { defineConfig } from "vitepress";

import navConfig from "./navConfig";
import sidebarConfig from "./sidebarConfig";
import sidebarDocs from "./sidebarDocs";

export default defineConfig({
	lang: "zh-CN",
	title: "BiliBili 直播助手",
	description: "B站直播，辅助工具",

	lastUpdated: true,

	themeConfig: {
		logo: "/logo.png",
		lastUpdatedText: "最后更新",

		nav: navConfig(),

		sidebar: {
			"/docs/": sidebarDocs(),
			"/config/": sidebarConfig(),
		},

		socialLinks: [
			{
				icon: "github",
				link: "https://github.com/bilibili-ayang/bilibili-live-helper",
			},
		],

		footer: {
			message: "Released under the MIT License.",
			copyright: "Copyright © 2022-present bilibili-ayang",
		},

		editLink: {
			pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
			text: "去 Github 编辑此页",
		},

		// 全文搜索相关配置
		// algolia: {
		// 	appId: "",
		// 	apiKey: "",
		// 	indexName: "",
		// },

		// 网站广告相关配置
		// carbonAds: {
		// 	code: "",
		// 	placement: "",
		// },
	},
});
