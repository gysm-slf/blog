<script setup lang="ts">
import type { Message } from '@components/@gysm/chat/message/ts/class'

const props = defineProps<{
  message: Message
}>()

const attachments = computed(() => {
  const attachmentList = props.message.attachments
  attachmentList.forEach((attachment) => {
    if (attachment instanceof File) {
      attachment.url = URL.createObjectURL(attachment);
    }
  })
  return attachmentList
})
</script>

<template>
<div class="message-layout">
  <div v-if="message.status === 'loading'">

  </div>
  <template v-else>
    <div class="attachments-container">
      <!-- 附件：先只展示一个，后续想想怎么展示比较好 -->
      <img :src="attachments[0].url" />
    </div>
    <div v-if="message.profile" class="profile">
      <img :src="message.profile" />
    </div>
    <div class="ai" v-if="message.role === 'system'">
      <div v-if="message.content instanceof String">
        {{ message.content }}
      </div>
      <div v-if="message.content instanceof Object">
        <div class="think">
          {{ message.content.think }}
        </div>
        {{ message.content.value }}
      </div>
    </div>
    <div class="user" v-else-if="message.role === 'user'">
      <div>
        {{ message.content }}
      </div>
    </div>
  </template>
</div>
</template>

<style scoped>

</style>
