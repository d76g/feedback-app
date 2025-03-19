<template>
  <div class="w-full mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md my-6">
    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Submit Feedback</h2>

    <form @submit.prevent="submitFeedback">
      <!-- Rating Input -->
      <div class="mb-4">
        <label for="rating" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Rating</label>
        <select
          id="rating"
          v-model="feedback.rating"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          required
        >
          <option disabled value="">Select Rating</option>
          <option v-for="star in [1, 2, 3, 4, 5]" :key="star" :value="star">{{ star }} Star(s)</option>
        </select>
      </div>

      <!-- Feedback Note -->
      <div class="mb-4">
        <label for="note" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Feedback</label>
        <textarea
          id="note"
          v-model="feedback.note"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Write your feedback..."
          rows="3"
        ></textarea>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit Feedback
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useFeedbackStore } from "@/store/feedbackStore";
import { useRoute } from 'vue-router';
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
const route = useRoute();
const feedbackStore = useFeedbackStore();
const applicationId = route.query.id;
const emit = defineEmits(['feedbackSubmitted']);
const router = useRouter();

// Reactive feedback state
const feedback = ref({
  rating: "",
  note: "",
});
const isSubmitting = ref(false);

const submitFeedback = async () => {
  if (!feedback.value.rating) {
    alert("Please fill in all fields.");
    return;
  }
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  const user = localStorage.getItem('user');
  var userId = null;
  if(user === null){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please login to add a feedback!',
    });
    router.push('/');
    return;
  } else{
    userId = JSON.parse(user).id;
  }
  try {
    await feedbackStore.addFeedback({
      rating: Number(feedback.value.rating),
      note: feedback.value.note.trim(),
      applicationId : applicationId,
      userId: userId,
    });

  feedbackStore.fetchFeedbacks(applicationId);
  emit('feedbackSubmitted');
  Swal.fire({
    title: "Comment Submitted",
    text: "Thank you for your feedback!",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
    position: "top-end",
    toast: true,
  });
  // Reset the form
  feedback.value.rating = "";
  feedback.value.note = "";
  } catch (error) {
    console.error(error);
    Swal.fire({
    title: "Something went wrong",
    text: "Please try again later.",
    icon: "error",
    showConfirmButton: false,
    timer: 1500,
    position: "top-end",
    toast: true,
  });
  } finally {
    isSubmitting.value = false;
  }

};
</script>
