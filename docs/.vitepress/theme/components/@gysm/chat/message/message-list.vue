<script setup lang="ts">
import type { Message } from '@components/@gysm/chat/message/ts/class'

defineProps<{
  messages: Message[]
}>()
</script>

<template>
  <div class="message-list">
    <div class="message-item" v-for="message in messages" :key="message.id">
      <message v-if="message.renderType === 'message' || message.renderType === 'default'" :message="message" />
      <div v-else>未找到可用的消息可视化组件：{{ message.renderType }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>
