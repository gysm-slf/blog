---
# 顶部为配置设置
# https://vitepress.dev/reference/default-theme-home-page
layout: home # 使用首页布局 doc | home | page
title: test # 页面标题 

hero:
  name: "My Awesome Project"
  text: "A VitePress Site"
  tagline: My great project tagline
  actions: # 指向链接
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples

features:
  - title: 即时启动
    details: 基于 Vite，开发时毫秒级热更新
  - title: Vue 驱动
    details: 直接在 Markdown 中使用 Vue 组件
---

## 可以使用组件
<!-- 
<script setup>
    import Custom from './components/Custom.vue'
</script>

<Custom />
-->

