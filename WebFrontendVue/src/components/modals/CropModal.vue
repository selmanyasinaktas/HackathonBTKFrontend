<template>
    <div class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg relative w-11/12 md:w-9/12 md:h-5/6">
        <button @click="close" class="absolute top-2 right-2 p-2 text-gray-900 dark:text-white hover:text-black hover:bg-red-600 border-2 border-red-600 rounded-md">
          <span class="material-icons">close</span>
        </button>
        <lists-component :categories="categories" @select="selectCategory" />
        <div class="flex mt-4">
          <button @click="confirmSelection" class="px-4 py-2 bg-blue-500 text-white rounded-lg mx-auto">Seç ve Devam Et</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import ListsComponent from '../containment/ListsComponent.vue';
  
  const categories = ref([]); 
  
  const selectedCategory = ref(null);
  
  const selectCategory = (category) => {
    selectedCategory.value = category;
  };
  
  const confirmSelection = () => {
    if (selectedCategory.value) {
      emit('categorySelected', selectedCategory.value); 
      close();
    } else {
      alert("Lütfen bir kategori seçin.");
    }
  };
  
  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/v1/questions/category/list/tree");
      if (response.ok) {
        const data = await response.json();
        categories.value = data.data;
      } else {
        console.error("API hatası:", response.status);
      }
    } catch (error) {
      console.error("Bağlantı hatası:", error);
    }
  };
  
  onMounted(fetchCategories);
  
  const close = () => emit('close');
  </script>
  
  <style scoped>
  </style>
  