import { defineConfig } from "vitepress";
import { defineTeekConfig } from "vitepress-theme-teek/config";
import path from 'path'
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
// import { withMermaid, MermaidPlugin } from "vitepress-plugin-mermaid";
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { mermaidPlugin } from './theme/plugins/mermaid-plugin'

/**
 * VitePress 不会读取根目录的 vite.config.ts 配置文件，这是属于 Vite 自己的配置系统
 * VitePress Theme Teek 没有独立的配置文件，配置都是通过在 VitePress 的配置文件中使用 defineTeekConfig 函数进行配置
 */
// Teek 主题配置
const teekConfig = defineTeekConfig({
  // loading: "已经是全速前进了~", // 注意：开启后会导致 VitePress 锚点定位失效 teek 与 VitePress 插件不兼容 bug
  banner: {
    enabled: true, // 是否启用 Banner
    name: "Yo ~", // Banner 标题，默认读取 vitepress 的 title 属性
    bgStyle: "fullImg", // Banner 背景风格：pure 为纯色背景，partImg 为局部图片背景，fullImg 为全屏图片背景
    // pureBgColor: "#28282d", // Banner 背景色，bgStyle 为 pure 时生效
    imgSrc: [
      "/img/景观/z2S0nWQAixL39g3.jpeg",
      "/img/景观/y9Sv1mAOSbxndJJ.jpeg",
      "/img/景观/img_5a03073b9606ceba_TzFUQU1IQmxvU0ZHdmlWOVdDc1JyaDREcTBPbTRQTGs.jpg",
      "/img/景观/1xdsuz.jpg",
      "/img/景观/49dfba8b30711dfc0ce7bd2cc15635bc.jpg",
      "/img/景观/green.png",
      "/img/景观/sekiro.png",
      "/img/景观/green3.jpg",
      "/img/景观/3803e7ca1d5381f77cbe315724dc3540.jpg",
      "/img/景观/eASXLgjGSMgNGzE.jpeg",
      "/img/景观/EWSo8ezdSV3JmZd.jpeg",
      "/img/动物/2.jpg",
      "/img/动物/vw37ij.jpg",
      "/img/人物/f6o6e9.jpg",
      "/img/人物/【哲风壁纸】动漫角色-小兰.png",
      "/img/人物/【哲风壁纸】jk制服-JK背影.png",
      "/img/人物/kt2.jpg",
      "/img/人物/WXSJDW7vHQ1Yv6b.jpeg"
    ], // Banner 图片链接。bgStyle 为 partImg 或 fullImg 时生效
    imgInterval: 15000, // 当多张图片时（imgSrc 为数组），设置切换时间，单位：毫秒
    imgShuffle: true, // 图片是否随机切换，为 false 时按顺序切换，bgStyle 为 partImg 或 fullImg 时生效
    imgWaves: true, // 是否开启 Banner 图片波浪纹，bgStyle 为 fullImg 时生效
    mask: true, // Banner 图片遮罩，bgStyle 为 partImg 或 fullImg 时生效
    maskBg: "rgba(0, 0, 0, 0.4)", // Banner 遮罩颜色，如果为数字，则是 rgba(0, 0, 0, ${maskBg})，如果为字符串，则作为背景色。bgStyle 为 partImg 或 fullImg 且 mask 为 true 时生效
    textColor: "#ffffff", // Banner 字体颜色，bgStyle 为 pure 时为 '#000000'，其他为 '#ffffff'
    titleFontSize: "3.6rem", // 标题字体大小
    descFontSize: "1.6rem", // 描述字体大小
    descStyle: "types", // 描述信息风格：default 为纯文字渲染风格（如果 description 为数组，则取第一个），types 为文字打印风格，switch 为文字切换风格
    description: [
      "学如逆水行舟，不进则退。",
      "合抱之木，生于毫末；九层之台，起于累土；千里之行，始于足下。"
    ], // 描述信息
    switchTime: 4000, // 描述信息切换间隔时间，单位：毫秒。descStyle 为 switch 时生效
    switchShuffle: false, // 描述信息是否随机切换，为 false 时按顺序切换。descStyle 为 switch 时生效
    typesInTime: 200, // 输出一个文字的时间，单位：毫秒。descStyle 为 types 时生效
    typesOutTime: 100, // 删除一个文字的时间，单位：毫秒。descStyle 为 types 时生效
    typesNextTime: 800, // 打字与删字的间隔时间，单位：毫秒。descStyle 为 types 时生效
    typesShuffle: false, // 描述信息是否随机打字，为 false 时按顺序打字，descStyle 为 types 时生效
  },
  post: {
    postStyle: "list", // 文章列表风格 list | card
    excerptPosition: "top", // 文章摘要位置 (仅list有效)
    showMore: true, // 是否显示更多按钮 (仅list有效)
    moreLabel: "阅读全文 >", // 更多按钮文字 (仅list有效)
    coverImgMode: "full", // 文章封面图模式 default | full (仅list有效)
    emptyLabel: "暂无文章", // 文章列表为空时的标签
    showCapture: true, // 是否在摘要位置显示文章部分文字，当为 true 且不使用 frontmatter.describe 和 <!-- more --> 时，会自动截取前 300 个字符作为摘要
    splitSeparator: true, // 文章信息（作者、创建时间、分类、标签等信息）是否添加 | 分隔符
    transition: true, // 是否开启过渡动画
    transitionName: "tk-slide-fade", // 自定义过渡动画名称
    listStyleTitleTagPosition: "right", // 列表模式下的标题标签位置
    cardStyleTitleTagPosition: "left", // 卡片模式下的标题标签位置
    defaultCoverImg: [], // 默认封面图地址，如果不设置封面图则使用默认封面图地址
  },
  // 文章配置 -> start
  appreciation: {
    position: "doc-after-popper", // 赞赏位置
    // 赞赏配置
    options: {
      trigger: "click", // 触发方式
      icon: "weChatPay", // 赞赏图标，内置 weChatPay 和 alipay
      title: "打赏支持", // 展开标题，支持 HTML
      content: `<img src='/teek-logo-large.png'> <img src='/teek-logo-large.png'>`, // 赞赏内容，支持 HTML
    },
  },
  articleShare: {
    enabled: true, // 是否开启文章链接分享功能
    text: "分享此页面", // 分享按钮文本
    copiedText: "链接已复制", // 复制成功文本
    query: false, // 是否包含查询参数
    hash: false, // 是否包含哈希值
  },
  /*articleBottomTip: frontmatter => {
    if (typeof window === "undefined") return;

    const hash = false;
    const query = false;
    const { origin, pathname, search } = window.location;
    const url = `${origin}${frontmatter.permalink ?? pathname}${query ? search : ""}${hash ? location.hash : ""}`;
    const author = "sulongfei";

    return {
      type: "tip",
      // title: "声明", // 可选
      text: `<p>作者：${author}</p>
             <p style="margin-bottom: 0">链接：<a href="${decodeURIComponent(url)}" target="_blank">${decodeURIComponent(url)}</a></p>
             <p>版权：此文章版权归 ${author} 所有，如有转载，请注明出处!</p>
            `,
    };
  },*/
  articleUpdate: {
    enabled: true, // 是否启用文章最近更新栏
    limit: 3, // 文章最近更新栏显示数量
  },
  // end <-
  backTop: {
    enabled: true, // 是否启动回到顶部功能
    content: "icon", // 回到顶部按钮的显示内容，可选配置 progress | icon
    done: TkMessage => TkMessage.success("又回到最初的起点~"), // 回到顶部后的回调
  },
  codeBlock: {
    enabled: true, // 是否启用新版代码块
    collapseHeight: 700, // 超出高度后自动折叠，设置 true 则默认折叠，false 则默认不折叠
    overlay: false, // 代码块底部是否显示展开/折叠遮罩层
    overlayHeight: 400, // 当出现遮罩层时，指定代码块显示高度，当 overlay 为 true 时生效
    langTextTransform: "uppercase", // 语言文本显示样式，为 text-transform 的值:none, capitalize, lowercase, uppercase
  },
  /*bodyBgImg: {
    imgSrc: ["/img/bg1.jpg", "/img/bg2.png"], // body 背景图片链接。单张图片 string | 多张图片 string[], 多张图片时每隔 imgInterval 秒换一张
    imgOpacity: 1, // body 背景图透明度，选值 0.1 ~ 1.0
    imgInterval: 15000, //  body 当多张背景图时（imgSrc 为数组），设置切换时间，单位：毫秒
    imgShuffle: false, // body 背景图是否随机切换，为 false 时按顺序切换
    mask: false, // body 背景图遮罩
    maskBg: "rgba(0, 0, 0, 0.2)", // body 背景图遮罩颜色，如果为数字，则是 rgba(0, 0, 0, ${maskBg})，如果为字符串，则作为背景色。mask 为 true 时生效
  },*/
});

// https://vitepress.dev/reference/site-config
// VitePress 特有配置，非 vue3 标准配置 （站点配置，内容相关，声明式）
// export default withMermaid  ({})， 使用 withMermaid 会导致与 teek 插件部分功能冲突 因此不再以此形式实现
export default defineConfig({
      /* ↓ VitePress 配置 */
      title: "gysm_slf",
      description: "A VitePress Site",
      /* ↑ VitePress 配置 ----- mermaid 配置 ↓ */
      /*mermaid: {},
      mermaidPlugin: {
        class: "mermaid mermaid-custom-class", // 可添加自定义 class
      },*/
      /* ↑ mermaid 配置 */
      vite: {
        server: {
          port: 8888,
          host: true,
          open: true, // 启动时自动打开浏览器
        },
        plugins: [
          // 组件的几种使用方式
          // 一：局部注册
          // 每次使用前都需要 import ，且需要在组件中的 components 中声明（vue3 使用 setup 时只需要引入即可）
          // 二：全局注册
          // 在入口文件通过根实例 .component('HelloWorld', HelloWorld) 注册，使用时无需 import
          // 三：自动导入库 unplugin-vue-components + unplugin-auto-import
          // 添加如下 Components + AutoImport 配置后，直接使用组件即可，使用到的组件在打包时才会被添加进去
          // 会自动生成对应的 .d.ts 文件
          // 注意：AutoImport 在组件和脚本中都可自动引入，但 Components 自动导入组件仅对组件内有效，在 js 或 ts 中需要使用组件时依然需要引入
          Components({
            dts: true,
            dirs: ['.vitepress/theme/components', '.vitepress/theme/components'],
            extensions: ['vue', 'md'],
            include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
            resolvers: [ElementPlusResolver()],
          }) as any,
          // AutoImport 主要针对 Vue 库设计，三方库需要额外配置
          AutoImport({
            imports: [
              'vue', // from "vue" 的钩子不再需要引入
              'vue-router' // 同理， from "vue-router" 的钩子不再需要引入
            ],
            dts: true,
            resolvers: [ElementPlusResolver()],
          }) as any,
        ],
        resolve: {
          alias: {
            '@components': path.resolve(__dirname, './theme/components'),
            '@styles': path.resolve(__dirname, './theme/style')
          }
        }
      },
      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
          { text: '首页', link: '/index' },
          {
            text: '🐵程序猿专栏',
            items: [
              { text: '技术栈导航', link: '/navigation' },
              { text: 'vue3', link: '/🐵程序猿专栏/vue3/' },
              { text: '☕java', link: '/🐵程序猿专栏/☕java/' },
              { text: '🔥dify', link: '/🐵程序猿专栏/🔥dify/' },
              { text: 'js', link: '/🐵程序猿专栏/js/原型' },
              { text: 'ts', link: '/🐵程序猿专栏/ts/' },
              { text: 'python', link: '/🐵程序猿专栏/python/' },
              { text: 'linux', link: '/🐵程序猿专栏/linux/' },
              { text: '工具资源', link: '/🐵程序猿专栏/工具资源/nginx' }, // 随便选一个当入口，目前只有一个所以只能填 nginx
              { text: '开发规范', link: '/🐵程序猿专栏/开发规范' },
              { text: 'AI编程', link: '/🐵程序猿专栏/AI编程' },
            ]
          },
          {
            text: '🧐兴趣专栏',
            items: [
              { text: '专栏模板', link: '/🧐兴趣专栏/专栏模板/简介/什么是 xx ？' }
            ]
          },
          {
            text: '🔥热门',
            items: [
              { text: '🔥dify', link: '/🐵程序猿专栏/🔥dify/' },
            ]
          },
          {
            text: '👣生活',
            items: [
              { text: '🍲美食', link: '👣生活/🍲美食' },
              { text: '电影', link: '👣生活/电影' },
              { text: '游戏', link: '👣生活/游戏' },
              { text: '音乐', link: '👣生活/音乐' },
              { text: '相册', link: '👣生活/相册' },
            ]
          },
          {
            text: '备忘录',
            items: [
              { text: '日报', link: '/备忘录/日报' },
              { text: '任务栈', link: '/备忘录/任务栈' },
            ]
          },
          {
            text: '更新日志',
            items: [
              { text: '开发中...', link: '/更新日志' }
            ]
          },
          {
            text: '关于',
            items: [
              { text: '关于我', link: '/关于' }
            ]
          },
        ],

        sidebar: {
          '/🐵程序猿专栏/工具资源/': [
            {text: 'nginx', link: '/🐵程序猿专栏/工具资源/nginx'},
            {text: 'git', link: '/🐵程序猿专栏/工具资源/git'},
            {text: 'Markdown 语法示例', link: '/🐵程序猿专栏/📖使用手册/markdown-examples'}
          ],
          '/🐵程序猿专栏/📖使用手册/': [
            {text: 'Markdown 语法示例', link: '/🐵程序猿专栏/📖使用手册/markdown-examples'}, // link 以 / 结尾会默认读取目录下的 index.md
            {text: 'Frontmatter 配置示例', link: '/🐵程序猿专栏/📖使用手册/frontmatter-examples'},
          ],
          '/🐵程序猿专栏/🔥dify/': [
            {text: 'dify', link: '/🐵程序猿专栏/🔥dify/'},
            {text: 'dify-文献综述', link: '/🐵程序猿专栏/🔥dify/文献综述'},
          ],
          '/🐵程序猿专栏/js/': [
            {text: '原型', link: '/🐵程序猿专栏/js/原型'},
            {text: '运行机制', link: '/🐵程序猿专栏/js/运行机制'},
            {text: '网络请求', link: '/🐵程序猿专栏/js/网络请求'},
            {text: '事件', link: '/🐵程序猿专栏/js/事件'},
            {text: '函数库', link: '/🐵程序猿专栏/js/函数库'},
            {text: '样式（后续可以挪到css）', link: '/🐵程序猿专栏/js/样式相关'},
          ],
          '/🐵程序猿专栏/': [
            {text: 'vue3', link: '/🐵程序猿专栏/vue3/'},
            {text: '☕java', link: '/🐵程序猿专栏/☕java/'},
            {text: '🔥dify', link: '/🐵程序猿专栏/🔥dify/'},
            {text: 'ts', link: '/🐵程序猿专栏/ts/'},
            {text: 'python', link: '/🐵程序猿专栏/python/'},
            {text: 'linux', link: '/🐵程序猿专栏/linux/'},
          ],
          '/🧐兴趣专栏/专栏模板/': [
            {
              text: '简介',
              collapsed: true,
              items: [
                {text: '什么是 xx ？', link: '/🧐兴趣专栏/专栏模板/简介/什么是 xx ？'},
                {text: '前沿', link: '/🧐兴趣专栏/专栏模板/简介/前沿'},
                {text: '快速开始', link: '/🧐兴趣专栏/专栏模板/简介/快速开始'},
              ]
            },
            {
              text: '基础',
              items: [
                {text: '创建一个xx', link: '/🧐兴趣专栏/专栏模板/基础/创建一个xx'},
                {text: '语法', link: '/🧐兴趣专栏/专栏模板/基础/语法'},
              ]
            },
            {
              text: '进阶',
              items: [
                {text: '工作流程', link: '/🧐兴趣专栏/专栏模板/进阶/工作流程'},
              ]
            },
            {
              text: '深入',
              items: [
                {text: '源码', link: '/🧐兴趣专栏/专栏模板/深入/源码'},
              ]
            },
          ]
        },

        socialLinks: [
          { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ],

        // Algolia搜索
        search: {
          provider: 'algolia',
          options: {
            appId: 'PR608RN4AL',
            apiKey: '93a14dc104afc1c87468d91034f6090f',
            indexName: 'note',
            locales: {
              root: {
                placeholder: '搜索文档（内网不可用）',
                translations: {
                  button: {
                    buttonText: '搜索文档',
                    buttonAriaLabel: '搜索文档'
                  },
                  modal: {
                    searchBox: {
                      resetButtonTitle: '清除查询条件',
                      resetButtonAriaLabel: '清除查询条件',
                      cancelButtonText: '取消',
                      cancelButtonAriaLabel: '取消'
                    },
                    startScreen: {
                      recentSearchesTitle: '搜索历史',
                      noRecentSearchesText: '没有搜索历史',
                      saveRecentSearchButtonTitle: '保存至搜索历史',
                      removeRecentSearchButtonTitle: '从搜索历史中移除',
                      favoriteSearchesTitle: '收藏',
                      removeFavoriteSearchButtonTitle: '从收藏中移除'
                    },
                    errorScreen: {
                      titleText: '无法获取结果',
                      helpText: '你可能需要检查你的网络连接'
                    },
                    footer: {
                      selectText: '选择',
                      navigateText: '切换',
                      closeText: '关闭',
                      searchByText: '搜索提供者'
                    },
                    noResultsScreen: {
                      noResultsText: '无法找到相关结果',
                      suggestedQueryText: '你可以尝试查询',
                      reportMissingResultsText: '你认为该查询应该有结果？',
                      reportMissingResultsLinkText: '点击反馈'
                    },
                  },
                },
              },
            },
          },
        },
      },
      // scrollOffset: 64, // 锚点链接偏移量（ vitePress 资源较多时锚点定位可能不准，临时解决方案，将跳转时机调整到 nextTick 内即可[位置：vitepress/dist/client/app/index.js 搜索 document.getElementById(decodeURIComponent(location.hash).slice(1))]。）
      markdown: {
        lineNumbers: true, // 行号显示
        image: {
          // 开启图片懒加载
          lazyLoading: true
        },
        config: (md) => {
          md.use(mermaidPlugin)
        }
      },
      extends: teekConfig
    }
)
