<template >
 <div class="flex p-4 gap-4">
  <input type="text" v-model="comment" id="comment" class="w-full border p-2 rounded-lg" placeholder="Add a comment..." />
  <button @click="addComment" class="bg-blue-500 text-white text-sm p-2 rounded-lg w-32 hover:bg-blue-600">Add</button>
 </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useCommentStore } from '@/store/commentStore';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
const props = defineProps(['feedbackId'])

const commentStore = useCommentStore();
const route = useRoute();
const applicationId = route.query.id;
const comment = ref('');

// get user id from local storage
const user = localStorage.getItem('user');
var userId = null;
const router = useRouter();

const addComment = async () => {

  if (!comment.value.trim()) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please write something!',
    });
    return;
  }
  // if no userId REDIRECT TO LOGIN
  if(user === null){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please login to add a comment!',
    });
    router.push('/');
    return;
  } else{
    userId = JSON.parse(user).id;
  }
  await commentStore.addComment(
    {
      userId: userId,
      feedbackId: props.feedbackId,
      text: comment.value,
      upVotes: 0,
      downVotes: 0,
    }

  );
  comment.value = '';
};
</script>
