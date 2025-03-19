<script setup>
import { RouterView, RouterLink } from 'vue-router';
import { useWebSocket } from './composables/useWebSocket';

useWebSocket();
</script>

<template>
    <main class="flex-grow">
      <RouterView />
    </main>
</template>
