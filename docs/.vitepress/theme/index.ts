// .vitepress/theme/index.ts
import { defineComponent, h, provide, computed  } from "vue";
import Teek, { useCopyBanner, giscusContext, walineContext } from "vitepress-theme-teek";
import { useData, useRoute } from 'vitepress';
import "./style/index.scss";

// import { init } from "@waline/client"; // https://waline.js.org/
// import Giscus from "@giscus/vue"; // https://giscus.app/zh-CN
import giscusTalk from 'vitepress-plugin-comment-with-giscus';

import confetti from "./components/confetti.vue"
import ribbon from "./components/ribbon.vue"
import rainbowGradient from "./components/rainbow-gradient.vue"

// VitePress 特有的配置，非 Vue3 标准配置 （表现层，编程式）
export default {
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
    },
    Layout: defineComponent({
        name: "LayoutProvider",
        setup() {
            const { frontmatter } = useData();
            const route = useRoute();
            giscusTalk({
                    repo: "gysm-slf/giscus",
                    repoId: "R_kgDOSDP0kg",
                    category: "General",
                    categoryId: "DIC_kwDOSDP0ks4C65MC",
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
            return () => h(Teek.Layout, null, {});
        },
    }),
    enhanceApp({ app }) {
        // ❌ 不好的做法：注册了大量只在单个页面用的组件
        app.component('confetti', confetti) // 散落彩纸
        app.component('ribbon', ribbon) // 背景彩带
        app.component('rainbowGradient', rainbowGradient) // 项目名称彩虹渐变
    },
};


