<template>
    <div class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 p-14 rounded-lg shadow-lg relative w-11/12 md:w-9/12 md:h-5/6">
        <button @click="close" class="absolute top-2 right-2 p-2 text-gray-900 dark:text-white hover:text-black hover:bg-red-600 border-2 border-red-600 rounded-md">
          <span class="material-icons">close</span>
        </button>
  
        <video ref="videoElement" class="w-full h-full object-contain mb-4"></video>
        <div class="flex mt-4">
          <button @click="takePicture" class="px-4 mx-auto py-2 bg-blue-500 text-white rounded-lg">Fotoğraf Çek</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, defineEmits } from 'vue';
  
  const emit = defineEmits(['close', 'capture']);
  const videoElement = ref(null);
  let stream = null;
  
  const startCamera = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoElement.value.srcObject = stream;
      await videoElement.value.play();
    } catch (error) {
      console.error('Kamerayı başlatma hatası:', error);
      emit('close');
    }
  };
  
  const close = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    emit('close');
  };
  
  const takePicture = async () => {
    if (videoElement.value) {
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.value.videoWidth;
      canvas.height = videoElement.value.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(videoElement.value, 0, 0, canvas.width, canvas.height);
  
      const imageData = canvas.toDataURL('image/png');
      emit('capture', imageData); 
      close(); 
    }
  };
  
  onMounted(startCamera);
  onBeforeUnmount(close);
  </script>
  