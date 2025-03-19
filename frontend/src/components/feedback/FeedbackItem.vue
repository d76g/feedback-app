<template>
  <li class="border p-2 my-2 rounded-lg">
    <p v-show="feedback.note" class="p-4 text-lg font-semibold">{{ feedback.note }}</p>
    <p class="text-gray-600 text-md flex justify-between px-4">
      Posted By: {{ feedback.User.username }}
      <span class="text-gray-400">{{ feedback.rating }}/5 ★</span>
    </p>
      <CommentList :feedbackId="feedback.id" />
  </li>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Feedback } from '@/types/feedback' // Adjust path accordingly
import CommentList from '../comments/CommentList.vue'

defineProps({
  feedback: {
    type: Object as PropType<Feedback>,
    required: true,
  },
})

</script>
