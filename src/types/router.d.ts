import type { RouteRecordRaw } from "vue-router";
import type { Rewrite } from ".";

export type Path =
	| "/"
	| "/barrage"
	| "/fans"
	| "/music"
	| "/prompt"
	| "/clock"
	| "/websocket";

export type Route = Rewrite<RouteRecordRaw, { path: Path }>;