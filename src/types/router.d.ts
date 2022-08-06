import type { RouteRecordRaw } from "vue-router";
import type { Rewrite } from ".";

export type Path =
  | "/"
  | "/barrage"
  | "/fans"
  | "/music"
  | "/prompt"
  | "/clock"
  | "/splash-screen";

export type Route = Rewrite<RouteRecordRaw, { path: Path }>;