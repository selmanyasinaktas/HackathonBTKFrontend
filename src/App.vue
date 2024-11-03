<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  document.documentElement.classList.add('dark'); 
});
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style >
.notyf__toast--success {
  background-color: #4caf50 !important; 
  color: white !important;
  border: none !important;
}

.notyf__toast--error {
  background-color: #f44336 !important;
  color: white !important;
  border: none !important;
}

</style>
