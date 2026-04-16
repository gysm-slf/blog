---
coverImg: /img/green.png
---

# Markdown Extension Examples

This page demonstrates some of the built-in markdown extensions provided by VitePress.

## 语法高亮

VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

**Input**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!', // [!code focus]
      description: "我的vitpress文档教程", // [!code --]
      description: "更详细的vitpress中文文档教程" // [!code ++]
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!', // [!code focus]
      description: "我的vitpress文档教程", // [!code --]
      description: "更详细的vitpress中文文档教程" // [!code ++]
    }
  }
}
```

## 代码组

::: code-group

```sh [pnpm]
# 查询pnpm版本
pnpm -v
```

```sh [yarn]
# 查询yarn版本
yarn -v
```

:::

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).
