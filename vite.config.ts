import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import transformerDirective from "@unocss/transformer-directives";
import presetUno from "@unocss/preset-uno";
import presetAttributify from "@unocss/preset-attributify";
import presetIcons from "@unocss/preset-icons";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      transformers: [transformerDirective()],
      presets: [presetUno(), presetAttributify(), presetIcons()]
    }),
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
      dts: "src/types/auto-import.d.ts",
      eslintrc: {
        enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
        filepath: "eslintrc-auto-import.json",
        globalsPropValue: true
      }
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      dts: "src/types/components.d.ts"
    })
  ],
  resolve: {
    alias: {
      "@": "/src"
    }
  },
  build: {
    target: "esnext"
  }
});