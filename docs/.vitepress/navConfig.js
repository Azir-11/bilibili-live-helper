import { version } from "../../package.json";

const navConfig = () => {
	return [
		{ text: "文档", link: "/docs/", activeMatch: "/docs/" },
		{ text: "配置", link: "/config/", activeMatch: "/config/" },
		{
			text: version,
			items: [
				{
					text: "贡献说明",
					link: "/common/contributing",
				},
				{
					text: "更新日志",
					link: "https://github.com/bilibili-ayang/bilibili-live-helper/master/CHANGELOG.md",
				},
			],
		},
	];
};

export default navConfig;
