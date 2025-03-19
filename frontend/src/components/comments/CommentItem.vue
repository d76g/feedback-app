<template>
  <ul>
    <li :key="comment.id" class="flex flex-col p-3 my-2 bg-gray-100 rounded-lg">
      <div>
        <!-- Comment Author -->
        <p class="text-gray-500 pb-2">{{ comment.User.username }}</p>
      </div>
      <div class="flex justify-between items-center w-full">
        <!-- Comment Text -->
        <p class="text-gray-600">{{ comment.text }}</p>

        <!-- Upvote / Downvote Buttons -->
        <div class="flex gap-2 items-center">
          <button @click="upvoteComment(comment.id)" class="text-green-500 hover:text-green-700">
            ▲ {{ comment.upVotes }}
          </button>
          <button @click="downvoteComment(comment.id)" class="text-red-500 hover:text-red-700">
            ▼ {{ comment.downVotes }}
          </button>
        </div>
      </div>

    </li>
  </ul>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Comment } from '@/types/comment'
import { useCommentStore } from '@/store/commentStore';

const commentStore = useCommentStore()
defineProps({
  comment: {
    type: Object as PropType<Comment>,
    required: true,
  },
})
function upvoteComment(commentId: number) {
  commentStore.upvoteComment(commentId) // Send upvote via WebSocket
}

function downvoteComment(commentId: number) {
  commentStore.downvoteComment(commentId) // Send downvote via WebSocket
}
</script>
