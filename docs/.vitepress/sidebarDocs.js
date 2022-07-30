const sidebarGuide = () => {
	return [
		{
			text: "入门",
			items: [
				{ text: "介绍", link: "/intro" },
				{ text: "使用", link: "/usage" },
				{ text: "技巧", link: "/skill" },
			],
		},
		{
			text: "效果展示",
			items: [
				{ text: "弹幕姬", link: "/module/danmu-helper" },
				{ text: "点歌姬", link: "/module/music-helper" },
				{ text: "粉丝姬", link: "/module/fans-helper" },
				{ text: "看板姬", link: "/module/kanban-helper" },
			],
		},
		{
			text: "最后",
			items: [
				{ text: "关于团队", link: "/docs/about" },
				{ text: "联系我们", link: "/docs/contact" },
			],
		},
	];
};

export default sidebarGuide;
