---
layout: doc
sidebar: false
pageClass: no-title-number tech-stack-nav-layout # 自定义类名
appreciation: false
articleUpdate: false # 禁用文章分享栏
---

# 技术栈导航

::: shareCard

```yaml
data:
  - name: 茂茂物语
    desc: 导航原作者
    avatar: https://fe-nav.netlify.app/logo.png # 头像，可选
    link: https://fe-nav.netlify.app/nav/ # 链接，可选
    bgColor: "#CBEAFA" # 背景色，可选，默认 var(--vp-c-gray-1)。颜色值有 # 号时请添加引号
    textColor: "#6854A1" # 文本色，可选，默认 var(--vp-c-text-1)
```

:::

<script setup>
import { NAV_CATEGORY_LIST } from '@components/navigation/ts/data'
</script>

<nav-category v-for="{title, items} in NAV_CATEGORY_LIST" :title="title" :items="items"/>
