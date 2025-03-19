<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router';
import { useFeedbackStore } from '@/store/feedbackStore';
const feedbackStore = useFeedbackStore();

const route = useRoute();
const applicationId = route.query.id;
import FeedbackItem from './FeedbackItem.vue';
import CommentForm from "../comments/CommentForm.vue";

onMounted(async () => {
  await feedbackStore.fetchFeedbacks(applicationId); // ✅ Fetch initial list
  feedbackStore.listenToWebSocket(); // ✅ Listen for WebSocket updates
});</script>

<template>
  <div class="w-full h-full p-4">
    <ul v-if="feedbackStore.feedbackList && feedbackStore.feedbackList.length > 0">
      <FeedbackItem
      v-for="feedback in feedbackStore.feedbackList"
      :key="feedback.id"
      :feedback="feedback"
    />
  </ul>
    <p v-else class="text-gray-500">No feedbacks yet.</p>
  </div>
</template>
