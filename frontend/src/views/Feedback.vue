<template>
  <div class="w-[800px] mx-auto">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold my-4 text-blue-600">Feedback for {{ applicationName }}</h1>
      <button class="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500" v-on:click="showForm = !showForm" >Add Feedback</button>
    </div>
    <div v-show="showForm"  >
      <FeedbackForm @feedbackSubmitted="handleFeedbackSubmitted"/>
    </div>
    <FeedbackList/>

  </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFeedbackStore } from "@/store/feedbackStore";
import FeedbackForm from "@/components/feedback/FeedbackForm.vue";
import FeedbackList from "@/components/feedback/FeedbackList.vue";
import { useRoute } from "vue-router";
const route = useRoute();
const feedbackStore = useFeedbackStore();
const applicationName = route.params.app;
const showForm = ref(true);
onMounted(() => {
  feedbackStore.listenToWebSocket();

});
const handleFeedbackSubmitted = () => {
  showForm.value = false;
};
</script>
