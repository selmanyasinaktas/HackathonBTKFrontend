<template>
  <div class="flex h-[95vh] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <!-- Sol Panel - Soruların Listesi -->
    <aside
      :class="sidebarOpen ? 'w-1/2 sm:w-1/3 lg:w-1/6' : 'w-30'"
      class="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white p-4 space-y-4 overflow-y-auto transition-all duration-500 ease-in-out flex flex-col items-start"
    >
      <!-- Açma/Kapama Düğmesi -->
      <button
        @click="toggleSidebar"
        class="flex items-center justify-center text-gray-900 dark:text-white mb-4 px-2 py-1 bg-blue-500 dark:bg-blue-600 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition w-full"
      >
        <span class="material-icons transform transition-transform duration-300" :class="sidebarOpen ? '' : 'rotate-180'">
          arrow_back
        </span>
        <span v-if="sidebarOpen" class="ml-2">Kapat</span>
      </button>

      <!-- Soru Listesi -->
      <div class="w-full">
        <p v-if="loading" class="text-center text-gray-900 dark:text-gray-300">Yükleniyor...</p>
        <p v-if="error" class="text-red-500 text-center">{{ error }}</p>
        <ul v-if="formattedQuestions && formattedQuestions.length && !loading" class="space-y-2">
          <li
            v-for="(question, index) in formattedQuestions"
            :key="index"
            @click="selectQuestion(index)"
            :class="{
              'bg-blue-700 text-white': selectedQuestionIndex === index,
              'hover:bg-gray-700 dark:hover:bg-gray-600': selectedQuestionIndex !== index
            }"
            class="p-3 rounded-lg cursor-pointer transition-colors flex items-center space-x-2"
          >
            <span class="material-icons">article</span>
            <span v-if="sidebarOpen">{{ truncateText(question.formattedText, 50) }}</span>
          </li>
        </ul>
      </div>
    </aside>

    <!-- Sağ Panel - Soru Detayları -->
    <main class="flex-1 px-6 bg-gray-100 dark:bg-gray-900 overflow-y-auto relative flex flex-col pb-20">
      <div class="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg p-6 flex-1 overflow-y-auto">
        <div class="relative">
          <SpeedDial :model="items" direction="left" style="position: absolute; right: 0" class="myButton" />
          <Toast />
          <ConfirmDialog />
        </div>

        <h1 class="text-2xl font-bold mb-4">Kategori:</h1>
        <p class="text-gray-800 dark:text-gray-300 mb-6">{{ selectedQuestion.category.path }} -> {{ selectedQuestion.subCategory.path }}</p>

        <h1 class="text-2xl font-bold mb-4">Sorunuz:</h1>
        <p class="text-gray-800 dark:text-gray-300 mb-6">{{ formattedQuestion }}</p>
        
        <!-- Soru Detayları -->
        <div class="space-y-4 flex flex-col">
          <div v-if="selectedQuestion.questionImage" class="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-100 dark:bg-gray-700">
            <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-200">Resminiz:</h3>
            <div class="card flex justify-center">
              <Image alt="Image" preview>
                <template #previewicon>
                  <i class="pi pi-search"></i>
                </template>
                <template #image>
                  <img :src="selectedQuestion.questionImage" alt="image" width="250" />
                </template>
                <template #preview="slotProps">
                  <img :src="selectedQuestion.questionImage" alt="preview" :style="slotProps.style" @click="slotProps.onClick" />
                </template>
              </Image>
            </div>
          </div>

          <div v-if="selectedQuestion.answers && selectedQuestion.answers.length" class="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-100 dark:bg-gray-700">
            <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-200">Yanıtlar:</h3>
            <ul class="space-y-2">
              <li
                v-for="(answer, index) in formattedAnswers"
                :key="index"
                class="text-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-500 rounded-lg p-5 my-3 bg-gray-100 dark:bg-gray-700"
              >
                <p class="whitespace-pre-line">{{ answer }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>