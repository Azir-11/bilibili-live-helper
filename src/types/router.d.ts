import type { RouteRecordRaw } from "vue-router";
import type { WindowOptions } from "@tauri-apps/api/window";
import type { Rewrite } from ".";

export type Path =
  | "/"
  | "/barrage"
  | "/fans"
  | "/music"
  | "/prompt"
  | "/clock"
  | "/splash-screen";

export type Route = Rewrite<
  RouteRecordRaw,
  {
    path: Path;
    meta?: {
      tauriOption: WindowOptions;
      [key: string]: any;
    };
  }
>;