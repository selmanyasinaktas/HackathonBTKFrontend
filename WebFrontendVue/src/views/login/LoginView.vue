<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white">Giriş Yap</h2>
      <form @submit.prevent @keydown.enter="handleLogin">
        <div class="space-y-4">
          <div>
            <label for="identifier" class="block text-sm font-medium text-gray-700 dark:text-gray-300">E-posta veya Kullanıcı Adı</label>
            <input
              type="text"
              id="identifier"
              v-model="identifier"
              class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Şifre</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
        </div>
        <button
          @click="handleLogin"
          v-if="!isLoading"
          type="button"
          class="w-full py-3 mt-6 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Giriş Yap
        </button>
        <button v-if="isLoading" type="button" class="w-full py-3 px-4 inline-flex items-center justify-center mt-6 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition ease-in-out duration-150 cursor-not-allowed" disabled>
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Giriş Yapılıyor...
          </button>
      </form>
      <router-link to="/auth/register" class="block mt-4 text-center text-sm text-gray-600 dark:text-gray-400 hover:underline">
        Henüz hesabınız yok mu? Kayıt olun
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const identifier = ref('');
const password = ref('');
const router = useRouter();
const isLoading = ref(false);
const notyf = new Notyf({
  duration: 5000, 
  position: { x: 'left', y: 'bottom' }, 
  dismissible: true, 
});

onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    router.push('/user/questions');
  }
});

async function handleLogin() {
  isLoading.value=true;
  try {
    const response = await axios.post('/api/v1/account/login', {
      identifier: identifier.value,
      password: password.value,
    });

    const { token, status } = response.data;

    if (status === 1 && token) {
      localStorage.setItem('token', token);
      
      notyf.success('Giriş başarılı!');
      isLoading.value=false
      router.push('/user/questions');
    }
  } catch (error) {
    console.error('Giriş işlemi başarısız:', error);
    notyf.error('Kullanıcı adı veya şifre hatalı.');
    isLoading.value=false

  }
}
</script>

<style scoped>

</style>
