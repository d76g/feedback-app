<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <h1>Applications</h1>
    <ul class="flex items-center space-x-6">
      <li v-for="app in applications" :key="app.id" @click="navigateToApp(app.id, app.name)" class="bg-gray-200 p-2 rounded cursor-pointer hover:bg-gray-300">
        {{ app.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { onMounted, ref} from 'vue';
import applicationService  from '@/services/applicationService';
const router = useRouter();
const applications = ref([]);

const fetchApplications = async () => {
  try {
    const response = await applicationService.fetchApplications();
    applications.value = response;
  } catch (error) {
    console.error('Error fetching applications:', error);
  }
};

onMounted(fetchApplications);


const navigateToApp = (appId, appName) => {
  router.push({ name: 'AppFeedback', params: { app: appName}, query: { id: appId }});
};
</script>
