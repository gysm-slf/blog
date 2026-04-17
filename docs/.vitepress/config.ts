import { defineConfig } from 'vitepress'
import { defineTeekConfig } from "vitepress-theme-teek/config"

// Teek 主题配置
const teekConfig = defineTeekConfig({
  loading: "已经是全速前进了~",
  banner: {
    enabled: true, // 是否启用 Banner
    name: "Yeah", // Banner 标题，默认读取 vitepress 的 title 属性
    bgStyle: "fullImg", // Banner 背景风格：pure 为纯色背景，partImg 为局部图片背景，fullImg 为全屏图片背景
    // pureBgColor: "#28282d", // Banner 背景色，bgStyle 为 pure 时生效
    imgSrc: ["/img/sekiro.png", "/img/ada_wong.png", "/img/green.png"], // Banner 图片链接。bgStyle 为 partImg 或 fullImg 时生效
    imgInterval: 15000, // 当多张图片时（imgSrc 为数组），设置切换时间，单位：毫秒
    imgShuffle: false, // 图片是否随机切换，为 false 时按顺序切换，bgStyle 为 partImg 或 fullImg 时生效
    imgWaves: true, // 是否开启 Banner 图片波浪纹，bgStyle 为 fullImg 时生效
    mask: true, // Banner 图片遮罩，bgStyle 为 partImg 或 fullImg 时生效
    maskBg: "rgba(0, 0, 0, 0.4)", // Banner 遮罩颜色，如果为数字，则是 rgba(0, 0, 0, ${maskBg})，如果为字符串，则作为背景色。bgStyle 为 partImg 或 fullImg 且 mask 为 true 时生效
    textColor: "#ffffff", // Banner 字体颜色，bgStyle 为 pure 时为 '#000000'，其他为 '#ffffff'
    titleFontSize: "3.2rem", // 标题字体大小
    descFontSize: "1.4rem", // 描述字体大小
    descStyle: "switch", // 描述信息风格：default 为纯文字渲染风格（如果 description 为数组，则取第一个），types 为文字打印风格，switch 为文字切换风格
    description: ["学如逆水行舟，不进则退。", "积跬步以至千里，致敬每个爱学习的你 —— 来自 Evan Xu"], // 描述信息
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
export default defineConfig({
  title: "演示",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '起点', link: '/' },
      { text: 'vue3', link: '/vue3/introduction/demo' }
    ],

    sidebar: {
      '/': [
        {text: 'Markdown Examples', link: '/markdown-examples'}
      ],
      '/vue3/': [
        {
          text: '简介',
          collapsed: true,
          items: [
            {text: '什么是 xx ?', link: '/vue3/introduction/demo'},
            {text: '什么是 xxx ?', link: '/vue3/introduction/demo2'},
          ]
        },
        {
          text: '基础',
          items: [
            {text: 'base demo', link: '/vue3/base/demo'},
          ]
        },
        {
          text: '进阶',
          items: [
            {text: 'advanced demo', link: '/vue3/advanced/demo'},
          ]
        },
        {
          text: '深入',
          items: [
            {text: 'deep demo', link: '/vue3/deep/demo'},
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
  },
  markdown: {
    lineNumbers: true, // 行号显示
  },
  extends: teekConfig
})
