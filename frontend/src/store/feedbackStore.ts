// store/feedbackStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Feedback } from '@/types/feedback'
import feedbackService from '@/services/feedbackService'
import applicationService from '@/services/applicationService'
import { useWebSocket } from '@/composables/useWebSocket';

export const useFeedbackStore = defineStore('feedback', () => {
  const { onFeedbackUpdate } = useWebSocket()
  const feedbackList = ref<Feedback[]>([])

  // ✅ Fetch feedbacks for a specific application
  async function fetchFeedbacks(applicationId: string) {
    feedbackList.value = await applicationService.getFeedbackByApplication(applicationId)
  }

  // ✅ Add feedback via API
  async function addFeedback(feedback: Partial<Feedback>) {
    await feedbackService.postFeedback(feedback)
  }

  // ✅ Add feedback from WebSocket update
  function pushFeedbackFromSocket(newFeedback: Feedback) {
    feedbackList.value.unshift(newFeedback)
  }

  // ✅ Initialize WebSocket listener
  function listenToWebSocket() {
    onFeedbackUpdate((newFeedback: Feedback) => {
      // Check if feedback already exists (prevent double add)
      if (!feedbackList.value.some((f) => f.id === newFeedback.id)) {
        feedbackList.value.unshift(newFeedback)
      }
    })
  }

  return { feedbackList, fetchFeedbacks, addFeedback, pushFeedbackFromSocket, listenToWebSocket }
})
