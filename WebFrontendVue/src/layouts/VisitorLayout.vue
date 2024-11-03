<template>
    <div class="dark:bg-gray-800 min-h-screen">
      <visitor-navbar /> 
      <main>
        <router-view /> 
      </main>

    </div>
  </template>
  
  <script setup>
  import VisitorNavbar from '../components/navigation/VisitorNavbar.vue';
  </script>
  
  <style scoped>
  </style>
  