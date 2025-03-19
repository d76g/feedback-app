import { defineStore } from "pinia";
import { ref } from "vue";
import type { Comment } from "@/types/comment";
import commentService from "@/services/commentService";
import { useWebSocket } from '@/composables/useWebSocket';

export const useCommentStore = defineStore("comment", () => {
  const {sendUpvote, sendDownvote, onCommentUpdate, onNewComment} = useWebSocket();

  const comments = ref<{ [feedbackId: number]: Comment[] }>({});

  async function fetchComments(feedbackId: number) {
    const fetched = await commentService.getCommentsByFeedbackId(feedbackId);
    comments.value[feedbackId] = fetched;
  }

  async function addComment(comment: Partial<Comment>) {
    await commentService.postComment(comment);
  }

  async function upvoteComment(commentId: number) {
    sendUpvote(commentId);
  }

  async function downvoteComment(commentId: number) {
    sendDownvote(commentId);
  }

  function listenToWebSocket() {
    onCommentUpdate((updatedComment: Comment) => {
      const feedbackId : number = updatedComment.feedbackId;
      if (!comments.value[feedbackId]) return;

      const index = comments.value[feedbackId].findIndex(c => c.id === updatedComment.id);
      if (index !== -1) {
        comments.value[feedbackId][index] = updatedComment;
      }
    });
    // 🔥 Add this part for "newComment"
  onNewComment((newComment: Comment) => {
    const feedbackId = newComment.feedbackId;
    if (!comments.value[feedbackId]) {
      comments.value[feedbackId] = [];
    }
    comments.value[feedbackId].push(newComment);
  });
  }

  function getCommentsByFeedback(feedbackId: number) {
    return comments.value[feedbackId] || [];
  }

  return { comments, fetchComments, addComment, upvoteComment, downvoteComment, listenToWebSocket, getCommentsByFeedback };
});
