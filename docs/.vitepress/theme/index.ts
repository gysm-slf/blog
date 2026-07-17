// .vitepress/theme/index.ts
import { useData, useRoute } from "vitepress";
import Teek, { useCopyBanner, giscusContext, walineContext } from "vitepress-theme-teek";
import "./style/index.scss";

// import { init } from "@waline/client"; // https://waline.js.org/
// import Giscus from "@giscus/vue"; // https://giscus.app/zh-CN
import giscusTalk from "vitepress-plugin-comment-with-giscus";

// import confetti from "./components/confetti.vue";
import customBanner from "./components/custom-banner.vue";
import calendarCard from "./components/calendar-card.vue";

import { useGoComment } from "./hooks/useGoComment"

// VitePress 入口文件
// VitePress 特有的配置，非 Vue3 标准配置 （表现层，编程式）
export default {
    // 继承主题配置
    extends: Teek,
    // 应用级 Setup 钩子，在 VitePress 应用启动时执行一次，用于初始化全局功能、插件或副作用
    setup: () => {
        /**
         * 配置方式，可自定义提示语
         *
         * 1. 提示语。默认:复制成功，复制和转载请标注本文地址
         * 2. 显示的持续时间(毫秒)，默认 3000
         */
        useCopyBanner();
        useGoComment() // 当前版本 teek 有bug，右下角前往评论无效，先自行实现绑定事件
    },
    // 包裹整个网站内容的根组件。VitePress 渲染页面时，会把 Markdown 内容塞进这个 Layout 组件里。
    // 通俗理解：它就是网站的“骨架”（头部导航、侧边栏、正文区域、页脚）。你想加评论区，就得在这个“骨架”的底部插一块位置。
    Layout: defineComponent({
        name: "LayoutProvider",
        setup() {
            const { frontmatter } = useData();
            const route = useRoute();
            giscusTalk({
                    repo: "gysm-slf/vite-press-giscus",
                    repoId: "R_kgDOSDP0kg",
                    category: "General",
                    categoryId: "DIC_kwDOSDP0ks4C65MD",
                    mapping: "pathname",
                    inputPosition: "bottom",
                    lang: "zh-CN",
                    strict: "1",
                    reactionsEnabled: "1",
                    async: true,
                    theme: "preferred_color_scheme", // 自动跟随系统/主题切换
                },
                {
                    frontmatter, route
                },
                //默认值为true，表示已启用，此参数可以忽略；
                //如果为false，则表示未启用
                //您可以使用“comment:true”序言在页面上单独启用它
                true
            );
            // 注入评论区实例
            // provide(walineContext, (el, options) => init({ serverURL: options.serverURL!, dark: options.dark, el }));
            // provide(giscusContext, () => Giscus);

            return () => h(Teek.Layout, null, {
                'teek-home-banner-name': (slotProps: { name?: string }) =>
                    h(customBanner, slotProps),
                "teek-home-card-my-after": () => h(calendarCard),
            });
        },
    }),
    // 增强 Vue 运行时环境，主要用于注册全局组件、指令、挂载全局属性
    /*enhanceApp({ app }) {
        // 因为安装了 unplugin-vue-components/vite 插件，所以此处可以注释
        // 全局注册
        app.component('confetti', confetti) // 散落彩纸
    },*/
    // 自定义 404 页
    // NotFound,
};


