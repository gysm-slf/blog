import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vite.dev/config/
export default defineConfig({
    // vite 配置方式（VitePress配置方式不同，可自行了解）
    // server: {
    //     port: 8888,           // 指定端口
    //     open: true,           // 启动时自动打开浏览器
    //     // host: '0.0.0.0',      // 允许外部访问
    //     // strictPort: false,    // 如果端口被占用，自动尝试下一个可用端口
    // },
    plugins: [
        vue(),
        // 自动导入组件 vue3 中，使用之前的两种使用方式
        /**
         * 1.全局注册
         * main.ts - 全局注册
         * import HelloWorld from './components/HelloWorld.vue'
         * const app = createApp(App)
         * app.component('HelloWorld', HelloWorld)
         *
         * 2.使用时注册（因为setup，vue3无需在对组件进行注册声明，如vue2的export default { component: {xxx} }）
         * <script setup lang="ts">
         *     import HelloWorld from './components/HelloWorld.vue'
         * </script>
         */
        Components({
            dts: true, // 生成类型声明文件
            dirs: [ // 扫描目录
                'docs/.vitepress/theme/components'
            ]
        }),
        // 自动导入 Vue API (如 ref、computed、watch 等)
        AutoImport({
            imports: ['vue', 'vue-router'], // 自动导入的库
            dts: true, // 生成类型声明文件
        }),
    ],
})
