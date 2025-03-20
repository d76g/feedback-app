<template>
  <div class="flex flex-row min-h-screen justify-center items-center">
    <form
      @submit.prevent="handleLogin"
      class="w-[40rem] bg-gray-100 max-w-sm mx-auto p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-white"
    >
      <div class="mb-5">
        <label for="username" class="block mb-2  font-medium text-gray-900 dark:text-white">
          Your Username <span class="text-xs text-gray-400">- case sensitive</span>
        </label>
        <input
          type="text"
          id="username"
          v-model="username"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Sven or Bashar"
          required
        />
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
// State variable for the username input
const username = ref('');

// Function to handle form submission
async function handleLogin() {
  if (!username.value.trim()) {
    alert('Please enter a username.');
    return;
  }

  try {
      // call post request to login

    const user = await axios.post('http://localhost:3000/api/auth/login', {
    username: username.value,
  });
  console.log(user);
  // Store the user in the localStorage
  localStorage.setItem('user', JSON.stringify(user.data));
  // Reset the username input
  username.value = '';

    // Redirect to the Home page
    router.push('/home')
  } catch (error) {
    if (error.response.status === 404) {
      alert('Invalid username. Please try again.');
    } else {
      alert('An error occurred. Please try again.');
    }
  }

};
</script>
