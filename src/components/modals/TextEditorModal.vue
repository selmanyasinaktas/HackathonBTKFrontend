
<template>
    <div class="fixed inset-0 bg-gray-800 bg-opacity-90 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg relative w-11/12 md:w-9/12">
        <button @click="close" class="absolute top-2 right-2 p-2 text-gray-900 dark:text-white hover:bg-red-600 border-2 border-red-600 rounded-md">
          <span class="material-icons">close</span>
        </button>
        <div class="w-full h-96">
          <ck-editor v-model="textContent"></ck-editor>
        </div>
        <div class="flex mt-4">
          <button @click="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg mx-auto">Gönder</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { submitText } from '../../helpers/textHelpers';
  
  const textContent = ref('');
  
  const close = () => emit('close');
  
  const submit = () => {
    submitText(textContent.value);
    close();
  };
  </script>
  
  <style scoped>
  </style>
  