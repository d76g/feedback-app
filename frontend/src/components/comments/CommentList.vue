<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useCommentStore } from '@/store/commentStore';
import CommentItem from './CommentItem.vue';
import CommentForm from './CommentForm.vue';

const props = defineProps({
  feedbackId: {
    type: Number,
    required: true,
  },
});

const commentStore = useCommentStore();

onMounted( async () => {
  await commentStore.fetchComments(props.feedbackId);
  commentStore.listenToWebSocket();
});
const comments = computed(() => commentStore.getCommentsByFeedback(props.feedbackId));


</script>

<template>
  <ul v-if="comments.length > 0" class="p-4">
    <CommentItem
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
    />
  </ul>
  <p v-else class="text-gray-500 p-4">Be the first to comment ...</p>
  <CommentForm :feedbackId="props.feedbackId" />
</template>

