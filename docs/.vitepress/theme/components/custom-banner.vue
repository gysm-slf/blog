<script setup lang="ts">
defineProps<{
  name?: string
}>()
</script>

<template>
<!-- 该 class 会激活 Teek 的内置样式 -->
<!--  <h1 class="tk-banner-content__title" aria-label="首页横幅标题">-->
  <h1 class="custom-home-title" aria-label="首页横幅标题">
    {{ name }}
  </h1>
</template>
