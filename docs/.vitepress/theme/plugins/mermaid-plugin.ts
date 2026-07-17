import type MarkdownIt from 'markdown-it'

/**
 * HTML 属性值转义
 */
function escapeHtmlAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * markdown-it 插件：将 ```mermaid 代码块渲染为 <mermaid> 组件
 */
export function mermaidPlugin(md: MarkdownIt) {
  const defaultFence = md.renderer.rules.fence!

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    // 提取纯语言标识符（忽略空格后的附加信息）
    const lang = token.info.trim().split(/\s+/)[0]

    if (lang === 'mermaid') {
      const source = escapeHtmlAttr(token.content)
      return `<mermaid source="${source}" />`
    }

    // 其他语言走默认代码块渲染
    return defaultFence(tokens, idx, options, env, self)
  }
}
