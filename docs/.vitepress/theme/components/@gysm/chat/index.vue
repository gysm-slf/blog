<script setup lang="ts">
defineOptions({ name: 'chat' })
import type { Message } from '@components/@gysm/chat/message/ts/class'

let input: string = ref('')
let attachments: string | string[] = ref('')
const messages: Message = ref([])

</script>

<template>
<div class="chat-layout">
  <div class="left">
    <div class="session-list">
      <slot name="session-list">
        <session-list />
      </slot>
    </div>
  </div>
  <div class="right">
    <!-- 主页 -->
    <div class="home">
      <slot name="home"></slot>
    </div>
    <div class="content">
      <div class="messages top">
        <slot name="message-list" :messages="messages">
          <message-list :messages="messages" />
        </slot>
      </div>
      <div class="bottom">
        <slot name="chat-input">
          <chat-input />
        </slot>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>
