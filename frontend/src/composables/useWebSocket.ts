import { ref, onMounted, onBeforeUnmount } from 'vue';
import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000';

//  Singleton Socket Instance
let socket: Socket | null = null;


export const useWebSocket = () => {
  const socket = ref<Socket | null>(null);

  const connect = () => {
    socket.value = io(SERVER_URL);

    socket.value.on('connect', () => {
      console.log('✅ Connected to WebSocket server');
    });

    socket.value.on('disconnect', () => {
      console.log('❌ Disconnected from WebSocket server');
    });
  };

  const disconnect = () => {
    if (socket.value) {
      socket.value.disconnect();
      console.log('🔌 Socket disconnected');
    }
  };

  const onFeedbackUpdate = (callback: (data: any) => void) => {
    if (socket.value) {
      socket.value.off('updateFeedback');
      socket.value.on('updateFeedback', callback);
    }
  };

  const onCommentUpdate = (callback: (data: any) => void) => {
    if (socket.value) {
      socket.value.off('updateComment');
      socket.value.on('updateComment', callback);
    }
  };

  const onNewComment = (callback: (data: any) => void) => {
    if (socket.value) {
      socket.value.off('newComment');
      socket.value.on('newComment', callback);
    }
  };

  const sendNewFeedback = (feedback: any) => {
    if (socket.value) {
      socket.value.emit('newFeedback', feedback);
    }
  };

  const sendNewComment = (comment: any) => {
    if (socket.value) {
      socket.value.emit('newComment', comment);
    }
  };

  const sendUpvote = (commentId: number) => {
    if (socket.value) {
      socket.value.emit('upvoteComment', { commentId });
    }
  };

  const sendDownvote = (commentId: number) => {
    console.log('👎 Downvoting comment:', commentId);
    if (socket.value) {
      socket.value.emit('downvoteComment', { commentId });
    }
  };

  onMounted(connect);
  onBeforeUnmount(disconnect); // Auto-cleanup!

  return {
    socket,
    onFeedbackUpdate,
    onCommentUpdate,
    onNewComment,
    sendNewFeedback,
    sendNewComment,
    sendUpvote,
    sendDownvote,
  };
};
