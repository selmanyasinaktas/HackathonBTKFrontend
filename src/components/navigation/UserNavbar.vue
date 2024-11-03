<template>
  <nav class="light:bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">SYFony</span>
      </router-link>

      <div class="flex items-center md:order-2 space-x-4 md:space-x-2 rtl:space-x-reverse relative">
        <!-- Language Selection Button -->
        <!-- <button
          type="button"
          @click="toggleDropdown"
          class="inline-flex items-center font-medium justify-center md:mr-6 px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <img :src="currentLanguage.icon" alt="Language Flag" class="w-5 h-5 me-3" />
          {{ currentLanguage.name }}
        </button> -->

        <!-- Language Dropdown -->
        <!-- <div
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
          </ul> -->
        <!-- </div> -->

        <div @click="toggleProfileDropdown" class="relative">
          <button
            type="button"
            class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
          >
            <img class="w-8 h-8 rounded-full" src="../../assets/profile-picture-3.jpg" alt="user photo">
          </button>

          <div
            v-if="isProfileDropdownOpen"
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow dark:bg-gray-700 z-50"
          >
            <div class="px-4 py-3 text-gray-900 dark:text-white">
              <span class="block text-sm font-medium">{{ user?.firstName + ' ' + user?.lastName }}  </span>
              <span class="block text-sm text-gray-500 truncate dark:text-gray-400">{{ user?.email }}</span>
            </div>
            <ul class="py-2">
              <li>
                <router-link
                  to="/user/questions"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >Sorularım</router-link>
              </li>
              <li>
                <router-link
                  to="/user/settings"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >Ayarlar</router-link>
              </li>
              <!-- <li>
                <router-link
                  to="/statistics"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >İstatistikler</router-link>
              </li> -->
              <li>
                <a
                  href="#"
                  @click.prevent="logout"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >Çıkış yap</a>
              </li>
            </ul>
          </div>
        </div>

        <button
          @click="toggleMobileMenu"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
      </div>

      <div
        :class="{'block': isMobileMenuOpen, 'hidden': !isMobileMenuOpen}"
        class="w-full md:flex md:w-auto md:order-1 mt-4 md:mt-0"
      >
        <ul
          class="flex flex-col font-medium p-4 md:p-0 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li>
            <router-link :to="'/user/home'" :class="getLinkClass('/user/home')">Anasayfa</router-link>
          </li>
          <li>
            <router-link :to="'/user/about'" :class="getLinkClass('/user/about')">Hakkımızda</router-link>
          </li>
          <li>
            <router-link :to="'/user/questions'" :class="getLinkClass('/user/questions')">Sorularım</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
import { inject } from 'vue';

const user = inject('user');
const isProfileDropdownOpen = ref(false);
const toggleProfileDropdown = () => {
  isProfileDropdownOpen.value = !isProfileDropdownOpen.value;
};

const logout = () => {
  localStorage.removeItem('token'); 
  router.push('/'); 
};

function handleClickOutside(event) {
  if (!event.target.closest('.relative')) {
    isProfileDropdownOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

const isDropdownOpen = ref(false);
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const isMobileMenuOpen = ref(false);
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const currentLanguage = ref({
  name: 'Türkçe',
  icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg',
  code: 'tr',
});

const languages = ref([
  { name: 'Türkçe', icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg', code: 'tr' },
  { name: 'English (US)', icon: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg', code: 'en' },
  { name: 'Deutsch', icon: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg', code: 'de' },
  { name: 'Italiano', icon: 'https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg', code: 'it' },
]);

const selectLanguage = (lang) => {
  currentLanguage.value = lang;
  isDropdownOpen.value = false;
};

const getLinkClass = (path) => {
  return route.path === path
    ? 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500'
    : 'block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700';
};
</script>

<style scoped>
</style>
