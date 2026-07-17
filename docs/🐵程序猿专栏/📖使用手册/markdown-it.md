---
title: Markdown-It 使用说明 # 默认为文档的一级标题
titleTag: 手册 # 标题右侧添加标识，如：原创、转载等。还有另一种实现方式，在 `title` 属性后使用组件，示例：title: VitePress Markdown 语法演示 <TkTitleTag type="tip" text="原创" position="right" />
outline: [2, 3] # 右侧页内导航展示几级，默认: [2] （只展示 h2 ） 
coverImg: /img/人物/f6o6e9.jpg
categories: ['使用手册'] # 分类，将显示在首页的文章列表、分类卡片、文章页顶部，并在分类页渲染所有分类的文章。
tags: ['markdown-it', 'Markdown'] # 标签，将显示在首页的文章列表、标签卡片、文章页顶部，并在标签页渲染所有标签的文章。
# date: # 指定日期
top: true # 是否设置为精选
sticky: true # 是否设置为置顶
sidebar: true # 是否显示侧边栏
article: true # 是否标识为文章
comment: true # 是否显示评论
# description: 摘要信息
pageStyle: segment-nav # "default" | "card" | "segment" | "card-nav" | "segment-nav"
pageClass: rainbow-title # 自定义类名 当前功能类名有：no-title-number（关闭小标题序号）、rainbow-title（彩色渐变小标题）
---

# markdown-it

## 核心生命周期

`markdown-it` 处理文本分为三步，你的用法分别对应后两步：

- **Core（核心预处理）**：处理非标准语法、嵌套等。
- **Block / Inline（解析）**：将文本拆解为 Token 流（块级如 `# 标题`，行内如 `**加粗**`）。
- **Renderer（渲染）**：将 Token 流转换为 HTML 字符串。

---

## 常用 `API`

### 解析器规则操作（Ruler 家族）

`md.block.ruler`、`md.inline.ruler`、`md.core.ruler` 都拥有完全相同的方法集，用来**调整解析顺序**（插件开发必备）：

| 方法 | 作用 | 示例 |
| :--- | :--- | :--- |
| **`before(anchor, name, fn)`** | 在 `anchor` 规则**之前**插入你的规则 | `md.block.ruler.before('heading', 'myHeader', fn)` |
| **`after(anchor, name, fn)`** | 在 `anchor` 规则**之后**插入 | `md.inline.ruler.after('emphasis', 'myEm', fn)` |
| **`push(name, fn)`** | 在规则链**最后**追加 | `md.core.ruler.push('myPlugin', fn)` |
| **`at(name, fn)`** | **替换**掉已有的内置规则 | `md.block.ruler.at('paragraph', myNewParaFn)` |
| **`disable(names)`** | 禁用内置规则（传数组），如关闭自动链接 | `md.block.ruler.disable(['table', 'code'])` |

#### 一个标准的 ruler 解析函数签名为

```js
function (state, silent) {
  // 1. 边界检查：判断当前位置是否符合当前规则的特征
  // 2. 如果不符合，直接 return false
  // 3. 如果 silent === true，说明只需"试探"能否匹配，不生成 Token，直接 return true
  // 4. 如果 silent === false，使用 state.push() 生成 Token
  // 5. 更新 state.pos 位置指针
  // 6. return true
}
```

- state：包含当前解析上下文（源码 src，当前位置 pos，Token 数组 tokens 等）。
- silent：极其重要。解析器会先以 silent=true 模式运行规则来判断边界，防止生成错误 Token。只有在确认匹配后，才会以 silent=false 再次运行以实际生成 Token。

### 渲染器规则操作（Renderer 家族）

`md.renderer.rules` 是一个对象，直接**赋值或修改**即可覆盖特定 Token 的输出：

| 常用 Token 类型（覆盖这些最实用） | 说明 |
| :--- | :--- |
| **`fence`** | 代码围栏块（` ``` `） |
| **`code_block`** | 缩进式代码块 |
| **`heading`** | 标题（`#`） |
| **`paragraph`** | 段落 |
| **`list_item`** | 列表项（`-` 或 `1.`） |
| **`image`** | 图片（可改懒加载或响应式） |
| **`link`** | 链接（可加 `target="_blank"`） |
| **`softbreak` / `hardbreak`** | 换行（可转为 `<br>` 或别的） |
| **`text`** | 纯文本（可做转义或过滤敏感词） |

> **技巧**：在自定义 `fence` 时，若想保留默认高亮，只需调用 `self.renderToken(tokens, idx, options)`。

### 插件注册与全局配置
| 方法 | 作用 |
| :--- | :--- |
| **`use(plugin, ...params)`** | 加载官方或第三方插件（最常用） |
| **`set(option, value)`** | 修改配置（如 `html: true` 允许标签） |
| **`enable(list)` / `disable(list)`** | 批量启用/禁用语法特性（如 `'table'`） |

### 核心渲染入口（你最终调用的）
| 方法 | 作用 |
| :--- | :--- |
| **`md.render(src)`** | 完整渲染 Markdown 字符串为 HTML |
| **`md.renderInline(src)`** | 仅渲染行内样式（不生成块级 `<p>`） |
| **`md.parse(src, env)`** | 只解析，返回 Token 数组（供你手动处理） |

---

## 实操案例

> 示例一

假如你想**解析自定义的 `!!note` 语法**，并渲染成带颜色的 `<div>`：

```javascript
// 1. 注册解析规则（在 fence 之前抢解析）
md.block.ruler.before('fence', 'note_block', function(state, startLine) {
  // 匹配 `!!note` 开头的行，生成自定义 Token
  if (state.src.startsWith('!!note', state.bMarks[startLine])) {
    const token = state.push('note_open', 'div', 1); // 入栈开标签
    token.attrSet('class', 'note');
    // ... 跳过内容逻辑
    state.push('note_close', 'div', -1); // 入栈闭标签
    return true;
  }
  return false;
});

// 2. 注册渲染规则（处理刚生成的 Token）
md.renderer.rules.note_open = (tokens, idx) => {
  return `<div class="custom-note">`;
};
md.renderer.rules.note_close = () => `</div>`;
```

> 示例二

::: warning 注意
在 Element Plus 的这段代码中，`md.renderer.rules.tooltip` 返回的 `<api-typing ... />` 在这一刻仅仅是一个纯文本字符串。markdown-it 根本不知道 Vue 组件是什么。

关键机制在于 VitePress 的渲染流水线：

markdown-it 将 Markdown 解析为 HTML 字符串（含 `<api-typing>`）。

VitePress 不会直接用 v-html 塞进 DOM，而是将这个字符串交给 Vue 的编译器（@vue/compiler-dom）。

Vue 编译器在编译时（或 SSR 时）识别出 `<api-typing>` 是一个全局注册的 Vue 组件，于是将其转换为 VNode（虚拟节点），最终渲染成真实的 DOM。

本质上：这是利用 markdown-it 做词法解析，但放弃了它的 HTML 渲染能力（renderer），转而将产物交给 Vue 的 Renderer 处理。
:::

```ts
import type { MarkdownRenderer } from 'vitepress'

export default (md: MarkdownRenderer): void => {
  md.renderer.rules.tooltip = (tokens, idx) => {
    const token = tokens[idx]

    return `<api-typing type="${token.content}" details="${token.info}" />`
  }

  md.inline.ruler.before('emphasis', 'tooltip', (state, silent) => {
    const tooltipRegExp = /^\^\[([^\]]*)\](`[^`]*`)?/
    const str = state.src.slice(state.pos, state.posMax)

    if (!tooltipRegExp.test(str)) return false
    if (silent) return true

    const result = str.match(tooltipRegExp)

    if (!result) return false

    const token = state.push('tooltip', 'tooltip', 0)
    token.content = result[1].replace(/\\\|/g, '|')
    token.info = (result[2] || '').replace(/^`(.*)`$/, '$1')
    token.level = state.level
    state.pos += result[0].length

    return true
  })
}
```

## 总结记忆口诀

- **想改输出样式** → 改 `md.renderer.rules.xxx`
- **想造新语法** → 用 `md.xxx.ruler.before/after/push`
- **想调顺序/关功能** → 用 `enable/disable` 或 `at` 替换

刚开始用，建议先用 `renderer.rules` 做微调（风险低），熟练后再挑战 `ruler` 扩展（需理解 Token 流）。如果对某个具体 Token 的字段（如 `block` 与 `inline` 状态）不清楚，随时问我！ 😊
