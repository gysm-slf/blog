<script setup lang="ts">
import mermaid from 'mermaid'
import { generateUUID } from '../tools/common'

const props = defineProps({
  source: { type: String, required: true }, // 源码
  config: { type: Object, default: () => ({}) }, // 配置
  extraClass: { type: String, default: '' } // 额外类名
})

const svg = ref('')
const error = ref('')
const containerRef = ref(null)

const generateId = () => `mermaid-${generateUUID()}`

const render = async () => {
  if (!props.source) {
    svg.value = ''
    error.value = ''
    return
  }

  try {
    // 只在首次或配置变化时重新初始化
    if (Object.keys(props.config).length > 0) {
      mermaid.initialize({
        startOnLoad: false,     // 我们手动控制渲染
        securityLevel: 'loose', // 允许基本交互（可调）
        ...props.config
      })
    }

    const { svg: renderedSvg, bindFunctions } = await mermaid.render(generateId(), props.source) // 结构赋值（在解构中使用:时表示重命名）
    svg.value = renderedSvg
    error.value = ''

    await nextTick()
    if (bindFunctions && containerRef.value) {
      bindFunctions(containerRef.value)
    }
  } catch (e) {
    error.value = `Mermaid 渲染失败：${e.message || e}`
    svg.value = ''
  }
}

// 首次加载
onMounted(() => render())
// 源码改变后刷新
// flush: pre*（在 DOM 更新 之前 执行。） | post（在 DOM 更新 之后 执行） | sync（在数据变化后立即同步执行。）
watch(() => props.source, () => render(), { flush: 'post' })
// 配置更新后刷新
watch(() => props.config, () => render(), { deep: true })
</script>

<template>
  <div ref="containerRef" :class="['mermaid-wrapper', extraClass]">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else class="mermaid" v-html="svg"></div>
  </div>
</template>

<style scoped>
.mermaid-wrapper {
  overflow-x: auto;
}
.error {
  color: #e53e3e;
  padding: 8px;
  font-size: 14px;
  background: #fff5f5;
  border: 1px solid #fc8181;
  border-radius: 4px;
}
</style>
