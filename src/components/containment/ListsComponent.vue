<template>
  <div class="max-w-sm mx-auto bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 max-h-[50vh] overflow-y-auto">
    <ul>
      <li v-for="category in categories" :key="category.id" class="mb-2">
        <div
          @click.stop="selectCategory(category, 'first')"
          @click="toggleCategory(category)"
          class="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-blue-500 transition duration-200 ease-in-out"
          :class="{
            'text-gray-800 dark:text-gray-100 font-semibold': true,
            'bg-blue-200 dark:bg-blue-500 rounded w-full': selectedFirstLevelId === category.id
          }"
        >
          <span class="m-2">{{ category.name }}</span>
          <i
            v-if="category.subCategories && category.subCategories.length > 0"
            :class="openCategories.includes(category.id) ? 'mdi mdi-chevron-down ml-auto' : 'mdi mdi-chevron-right ml-auto'"
            class="text-gray-500 dark:text-gray-400 transition-transform duration-300"
          ></i>
        </div>

        <transition name="fade" mode="out-in">
          <ul v-if="openCategories.includes(category.id)" class="pl-6">
            <li
              v-for="subCategory in category.subCategories"
              :key="subCategory.id"
              class="mb-2"
            >
              <div
                @click.stop="selectCategory(subCategory, 'second')"
                @click="toggleSubCategory(subCategory)"
                class="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-blue-500 transition duration-200 ease-in-out"
                :class="{
                  'text-gray-600 dark:text-gray-100': true,
                  'bg-blue-200 dark:bg-blue-500 rounded': selectedSecondLevelId === subCategory.id
                }"
              >
                <span class="p-1">{{ subCategory.name }}</span>
                <i
                  v-if="thirdLevelCategories[subCategory.id] && thirdLevelCategories[subCategory.id].length > 0"
                  :class="openSubCategories.includes(subCategory.id) ? 'mdi mdi-chevron-down ml-auto' : 'mdi mdi-chevron-right ml-auto'"
                  class="text-gray-500 dark:text-gray-400 transition-transform duration-300"
                ></i>
              </div>

              <transition name="fade" mode="out-in">
                <ul v-if="openSubCategories.includes(subCategory.id)" class="pl-6">
                  <li
                    v-for="thirdLevelCategory in thirdLevelCategories[subCategory.id] || []"
                    :key="thirdLevelCategory.id"
                    @click.stop="selectCategory(thirdLevelCategory, 'third')"
                    class="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-blue-500 transition duration-200 ease-in-out my-2"
                    :class="{
                      'text-gray-600 dark:text-gray-100': true,
                      'bg-blue-200 dark:bg-blue-500 rounded': selectedThirdLevelId === thirdLevelCategory.id
                    }"
                  >
                    <span class="p-1">{{ thirdLevelCategory.name }}</span>
                  </li>
                </ul>
              </transition>
            </li>
          </ul>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      openCategories: [],
      openSubCategories: [],
      thirdLevelCategories: {}, 
      selectedFirstLevelId: null,
      selectedSecondLevelId: null,
      selectedThirdLevelId: null,
    };
  },
  methods: {
    toggleCategory(category) {
      if (this.openCategories.includes(category.id)) {
        this.openCategories = this.openCategories.filter((id) => id !== category.id);
      } else {
        this.openCategories.push(category.id);
      }
    },
    async toggleSubCategory(subCategory) {
      if (this.openSubCategories.includes(subCategory.id)) {
        this.openSubCategories = this.openSubCategories.filter((id) => id !== subCategory.id);
      } else {
        this.openSubCategories.push(subCategory.id);

        if (!this.thirdLevelCategories[subCategory.id]) {
          try {
            const response = await fetch(
              `https://btkbackend.randevuburada.com/api/v1/questions/sub-category/list/tree?categoryId=${subCategory.id}`
            );
            if (response.ok) {
              const data = await response.json();
              this.thirdLevelCategories[subCategory.id] = data.data;
            } else {
              console.error("API hatası:", response.status);
            }
          } catch (error) {
            console.error("Bağlantı hatası:", error);
          }
        }
      }
    },
    selectCategory(category, level) {
      if (level === "first") {
        this.selectedFirstLevelId = category.id;
        this.selectedSecondLevelId = null;
        this.selectedThirdLevelId = null;
      } else if (level === "second") {
        this.selectedSecondLevelId = category.id;
        this.selectedThirdLevelId = null;
      } else if (level === "third") {
        this.selectedThirdLevelId = category.id;
      }

      console.log(`Seçilen kategori (${level}):`, category);

      localStorage.setItem("selectedCategory", JSON.stringify({ generalId: category.generalId, id: category.id, name: category.name, path: category.path }));
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
