<template>
    <nav class="light:bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">SYFony</span>
        </router-link>
  
        <div class="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse relative w-15">
          <!-- Language Selection Button -->
          <button
            type="button"
            @click="toggleDropdown"
            class="inline-flex items-center font-medium justify-center md:mr-12 px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <img :src="currentLanguage.icon" alt="Language Flag" class="w-5 h-5 me-3" />
            {{ currentLanguage.name }}
          </button>
  
          <!-- Dropdown -->
          <div
            v-if="isDropdownOpen"
            class="absolute top-full mt-1 dark:border-gray-800 dark:border w-40 text-base list-none light:bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-900 z-30"
          >
            <ul class="py-2 font-medium" role="none">
              <li v-for="lang in languages" :key="lang.code">
                <a
                  href="#"
                  @click.prevent="selectLanguage(lang)"
                  class="block px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  <div class="inline-flex items-center">
                    <img :src="lang.icon" alt="Flag" class="h-5 w-5 me-2" />
                    {{ lang.name }}
                  </div>
                </a>
              </li>
            </ul>
          </div>
  
          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-language"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
  
        <!-- Navigation Links -->
        <div
          v-if="isMobileMenuOpen || isDesktopMenuVisible"
          class="items-center justify-between md:ml-16 lg:ml-14 w-full md:flex md:w-auto md:order-1"
          id="navbar-language"
        >
          <ul
            class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 z-20"
          >
            <li>
              <router-link :to="'/'" :class="getLinkClass('/')">Home</router-link>
            </li>
            <li>
              <router-link :to="'/about'" :class="getLinkClass('/about')">About</router-link>
            </li>
            <li>
              <router-link :to="'/contact'" :class="getLinkClass('/contact')">Contact</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  
  const route = useRoute();
  

  const getLinkClass = (path) => {
    return route.path === path
      ? 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500'
      : 'block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700';
  };
  

  const currentLanguage = ref({
    name: 'Türkçe',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg', 
    code: 'tr',
  });
  
  const languages = ref([
    {
      name: 'Türkçe',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg',
      code: 'tr',
    },
    {
      name: 'English (US)',
      icon: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
      code: 'en',
    },
    {
      name: 'Deutsch',
      icon: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg',
      code: 'de',
    },
    {
      name: 'Italiano',
      icon: 'https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg',
      code: 'it',
    },
  ]);
  

  const isDropdownOpen = ref(false);
  const isMobileMenuOpen = ref(false);
  const isDesktopMenuVisible = ref(true);
  

  function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value;
  }
  

  function selectLanguage(lang) {
    currentLanguage.value = lang;
    isDropdownOpen.value = false;
  }
  

  function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
  }
 
  function handleResize() {
    isDesktopMenuVisible.value = window.innerWidth >= 768;
    if (isDesktopMenuVisible.value) {
      isMobileMenuOpen.value = false;
    }
  }
  

  onMounted(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); 
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });
  </script>
  
  <style scoped>

  </style>
  