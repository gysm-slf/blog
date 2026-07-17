<template>
  <div v-if="!!commandText" class="code-line">
    <pre class="code-line__content"><code><slot /></code></pre>
    <el-button @click="handleCopy" text bg>
      <svg v-if="!isCopied" class="el-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64z"></path><path fill="currentColor" d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64"></path></svg>
      <svg v-else class="el-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"></path></svg>
      复制
    </el-button>
  </div>
</template>

<script setup>
const isCopied = ref(false)
let timer = null

const slots = useSlots()
const commandText = computed(() => {
  return slots.default()[0]?.children || ''
})

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(commandText.value)
    isCopied.value = true
    clearTimeout(timer)
    timer = setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>

<style lang="scss" scoped>
.code-line {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f5f7fa;
  border-radius: 4px;
  padding: 4px 12px;
  font-size: 16px;
  line-height: 1.8;
  font-family: 'Monaco', 'Menlo', 'Consolas', 'Courier New', monospace;
  box-sizing: border-box;
  height: 46px;

  /* 代码内容区域 */
  .code-line__content {
    flex: 1;
    min-width: 0;
    margin: 0;
    padding: 2px 0;
    overflow-x: auto;
    white-space: pre;
    word-break: normal;
    color: #2c3e50;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    code {
      font-family: inherit;
      font-size: inherit;
      background: transparent;
      padding: 0;
    }
  }

  .el-icon {
    width: 18px;
    height: 18px;
    right: 2px;
    bottom: 1px;
  }

  :deep(.el-button) {
    span {
      font-size: 14px;
    }
  }
  :deep(.el-button).is-text:not(.is-disabled).is-has-bg:hover {
    background-color: #dce1ea;
  }
}

</style>
