<script setup lang="ts">
import { useRibbon } from "../hooks/useRibbon"; // 导入彩带背景

const { start: startRibbon, stop: stopRibbon } = useRibbon({
  immediate: false,
  clickReRender: false, // 点击页面重新渲染彩带
});

onMounted(() => {
  startRibbon();
});
</script>

<template></template>
