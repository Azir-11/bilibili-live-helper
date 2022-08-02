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
      imports: [
        "vue",
        "vue-router",
        "pinia",
        {
          "naive-ui": [
            "useDialog",
            "useMessage",
            "useNotification",
            "useLoadingBar"
          ]
        }
      ],
      dts: "src/types/auto-import.d.ts"
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
  }
});