<template>
  <div v-if="loading" class="text-center text-gray-600 dark:text-gray-300">Yükleniyor...</div>
  <div v-else class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg relative w-11/12 md:w-9/12 md:h-5/6">
      <!-- Kapatma Butonu -->
      <button
        @click="close"
        class="absolute top-2 right-2 p-2 text-gray-900 dark:text-white hover:text-black hover:bg-red-600 border-2 border-red-600 rounded-md"
      >
        <span class="material-icons">close</span>
      </button>

      <!-- Kategori Listesi -->
      <div v-if="categories.length > 0" class="mt-4">
        <lists-component :categories="categories" @select="selectCategory" />
      </div>
      <div v-else class="text-center text-gray-600 dark:text-gray-300">Kategoriler yükleniyor...</div>

      <!-- Onay Butonu -->
      <div class="flex mt-4">
        <button @click="confirmSelection" class="px-4 py-2 bg-blue-500 text-white rounded-lg mx-auto">Seç ve Devam Et</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import ListsComponent from '../containment/ListsComponent.vue';

const emit = defineEmits(['close', 'categorySelected']);
const categories = ref([]);
const selectedCategory = ref(null);
const loading = ref(true); 

const fetchCategories = async () => {
  try {
    const response = await fetch("https://btkbackend.randevuburada.com/api/v1/questions/category/list/tree");
    if (response.ok) {
      const data = await response.json();
      categories.value = data.data;
    } else {
      console.error("API hatası:", response.status);
    }
  } catch (error) {
    console.error("Bağlantı hatası:", error);
  } finally {
    loading.value = false; 
  }
};

onMounted(fetchCategories);

const selectCategory = (category) => {
  selectedCategory.value = category;
};

const confirmSelection = () => {
  const storedCategory = selectedCategory.value || JSON.parse(localStorage.getItem("selectedCategory"));
  if (storedCategory && storedCategory.id && storedCategory.name) {
    selectedCategory.value = storedCategory;
    emit('categorySelected', selectedCategory.value);
    close();
  } else {
    alert("Lütfen bir kategori seçin.");
  }
};

const close = () => emit('close');
</script>
