const sidebarConfig = () => {
	return [
		{
			text: "配置说明",
			items: [
				{ text: "软件设置", link: "/config/app-configs" },
				{ text: "主播设置", link: "/config/up-configs" },
				{ text: "弹幕助手设置", link: "/config/helper-configs" },
			],
		},
	];
};

export default sidebarConfig;
