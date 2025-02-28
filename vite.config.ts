import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import vuetify from "vite-plugin-vuetify";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import Inspect from "vite-plugin-inspect";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      vuetify({ autoImport: true }),
      AutoImport({
        // 匹配的文件，也就是哪些后缀的文件需要自动引入
        include: [/\.[tj]s$/, /\.vue$/],
        // 自动引入的api从这里找
        imports: ["vue", "vue-router"],
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
        symbolId: "icon-[dir]-[name]",
      }),
      Inspect({
        build: true,
        outputDir: ".vite-inspect",
      }),
    ],
    resolve: {
      alias: {
        "@": path.join(__dirname, "./src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `@use "@/style/scss/_custom-variable.scss" as *;`,
          additionalData: `@use "@/style/scss/_custom-variable.scss" as *;
          @use "@/style/element/index.scss" as *;`,
        },
      },
    },
    server: {
      port: 9000,
      proxy: {
        "/appApi": {
          target: "http://geniussbg.cn:10010/",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/appApi/, ""),
        },
      },
    },
    define: {
      // 'import.meta.env.ENV_VARIABLE': JSON.stringify(process.env.ENV_VARIABLE)
      // 'process.env':loadEnv(mode,process.cwd())
    },
  };
});
