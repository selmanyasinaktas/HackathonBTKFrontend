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
        <!-- <h2 v-if="sidebarOpen" class="text-lg font-semibold mb-4">Eklenen Sorular</h2> -->
        <p v-if="loading" class="text-center text-white dark:text-gray-900">Yükleniyor...</p>
        <p v-if="error" class="text-red-500 text-center">{{ error }}</p>
        <ul v-if="formattedQuestions  && formattedQuestions.length && !loading" class="space-y-2">
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
    <main class="flex-1 px-6 bg-gray-100 dark:bg-gray-900 overflow-y-auto relative flex flex-col pb-20" v-if="selectedQuestion">
      <div class="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg p-6 flex-1 overflow-y-auto">
        <div class="relative">
          <SpeedDial :model="items" direction="left" style="position: absolute;  right: 0" class="myButton"/>
          <Toast />
          <ConfirmDialog></ConfirmDialog>
        </div>
        <h1 class="text-2xl font-bold mb-4">Kategori:           
        </h1>
        <p class="text-gray-800 dark:text-gray-300 mb-6">{{ selectedQuestion.category.path }} -> {{ selectedQuestion.subCategory.path }}
          
        </p>

        <h1 class="text-2xl font-bold mb-4">Sorunuz:           
        </h1>
        <p class="text-gray-800 dark:text-gray-300 mb-6">{{ formattedQuestion }}
          
        </p>
        
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
            <!-- <img @click="openImageModal" :src="selectedQuestion.questionImage" alt="Question Image" class="max-w-96 rounded-lg mx-auto cursor-pointer"> -->
          </div>
          
          <div v-if="selectedQuestion.answers && selectedQuestion.answers.length" class="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-100 dark:bg-gray-700">
            <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-200">Yanıtlar:</h3>
            <ul class="space-y-2">
              <li v-for="(answer, index) in formattedAnswers" :key="index" class="text-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-500 rounded-lg p-5 my-3 bg-gray-100 dark:bg-gray-700">
                <p class="whitespace-pre-line">{{ `${answer}` }}</p>
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    </main>
    <div v-if="isEditorVisible" class="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-90 z-50">
      <div class="bg-white p-4 rounded-lg w-2/3">
        
       <div class="relative">
        <button @click="closeEditor" class="absolute top-0 right-0  hover:bg-red-600 hover:text-white bg-gray-800 p-3 rounded-full pb-16  w-8 h-8  text-white">
          <span class="relative">X</span>
        </button>
        <h2 class="text-lg font-semibold mb-4 text-black">Soruyu Düzenle</h2>
        
        <CkEditor :modelValue="selectedQuestion.question" @update:modelValue="updateQuestionContent" />
        
       </div>
      </div>
      <ConfirmDialog group="headless">
        <template #container="{ message, acceptCallback, rejectCallback }">
            <div class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded">
                <div class="rounded-full bg-primary text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20">
                    <i class="pi pi-question text-5xl"></i>
                </div>
                <span class="font-bold text-2xl block mb-2 mt-6">{{ message.header }}</span>
                <p class="mb-0">{{ message.message }}</p>
                <div class="flex items-center gap-2 mt-6">
                    <Button label="Kaydet" @click="acceptCallback"></Button>
                    <Button label="İptal Et" outlined @click="rejectCallback"></Button>
                </div>
            </div>
        </template>
    </ConfirmDialog>
    <div class="card flex justify-center my-8">
        <Button @click="requireConfirmation()" label="Kaydet"></Button>
    </div>
    <Toast />
    </div>
  </div>

 
</template>

<script setup>
import CkEditor from '../../components/ck-editor/CkEditor.vue';
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import Image from 'primevue/image';
import SpeedDial from 'primevue/speeddial';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import 'primeicons/primeicons.css';
import Button from 'primevue/button';

const toast = useToast();
const confirm = useConfirm();
const isEditorVisible = ref(false);

const selectQuestion = (index) => {
  selectedQuestionIndex.value = index;
  selectedQuestion.value = questions.value[index];
  console.log(selectedQuestion.value)
  console.log(selectedQuestion.value.category.path)
};




const requireConfirmation = () => {
    confirm.require({
        group: 'headless',
        header: 'Değişiklikleri kaydetmek ister misiniz?',
        message: 'Değişiklikleri kaydetmek için kaydet butonuna basınız.',
        accept: async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Token bulunamadı");

                const requestData = {
                    id: selectedQuestion.value.id,
                    // categoryId: selectedQuestion.value.category.id,
                    // subCategoryId: selectedQuestion.value.subCategory.id,  
                    question: selectedQuestion.value.question,
                    onlyLastAnswer: true
                };
                console.log("Gönderilen veri:", requestData);

                const response = await axios.post(
                    "/api/v1/questions/update",
                    requestData,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                console.log("API Yanıtı:", response.data);

                if (response.status === 200) {
                    toast.add({ severity: 'success', summary: 'Onaylandı', detail: 'Düzenleme başarıyla kaydedildi', life: 3000 });
                    window.location.reload();
                } else {
                    throw new Error("Güncelleme işlemi başarısız oldu.");
                }
            } catch (error) {
                console.error("Güncelleme hatası:", error.response || error);
                toast.add({ severity: 'error', summary: 'Güncelleme Hatası', detail: error.response?.data?.message || 'Soru güncellenemedi', life: 3000 });
            }
        },
        reject: () => {
            toast.add({ severity: 'info', summary: 'Reddedildi', detail: 'Düzenleme işlemi reddedildi', life: 3000 });
        }
    });
};




const items = ref([
  {
    label: 'Düzenle',
    icon: 'pi pi-pencil',
    command: () => {
      openEditor();
    }
  },
  {
    label: 'Sil',
    icon: 'pi pi-trash',
    command: () => {
      confirmDelete();
    }
  },
]);

const openEditor = () => {
  isEditorVisible.value = true;
};

const closeEditor = () => {
  isEditorVisible.value = false;
};
const updateQuestionContent = (newContent) => {
  selectedQuestion.value.question = newContent;
};

const questions = ref([]);
const selectedQuestion = ref(null);
const loading = ref(false);
const error = ref(null);
const sidebarOpen = ref(true);
const selectedQuestionIndex = ref(0);



const confirmDelete = () => {
  confirm.require({
    message: 'Bu soruyu silmek istediğinize emin misiniz?',
    header: 'Onay Gerekiyor',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sil',
    rejectLabel: 'İptal',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token bulunamadı");

        const response = await axios.put(
          "https://btkbackend.randevuburada.com/api/v1/questions/delete",
          {}, 
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            params: { id: selectedQuestion.value.id }
          }
        );

        if (response.status === 200) {
          toast.add({ severity: 'success', summary: 'Silme Onaylandı', detail: 'Soru silindi', life: 3000 });
          window.location.reload();
        } else {
          throw new Error("Silme işlemi başarısız oldu.");
        }
      } catch (error) {
        console.error("Silme hatası:", error.response || error);
        toast.add({ severity: 'error', summary: 'Silme Hatası', detail: error.response?.data?.message || 'Soru silinemedi', life: 3000 });
      }
    },
    reject: () => {
      toast.add({ severity: 'info', summary: 'Silme İptal Edildi', detail: 'Silme işlemi iptal edildi', life: 3000 });
    }
  });
};




const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};


const fetchQuestions = async () => {
  loading.value = true;
  error.value = null;
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token bulunamadı");

    const response = await axios.get('/api/v1/questions/list', {
      params: {
        OrderBy: 'UpdatedAt',
        OrderDirection: 'desc',
      },
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    questions.value = response.data.data;
    console.log(questions)
    if (questions.value.length > 0) {
      selectedQuestion.value = questions.value[0];
      selectedQuestionIndex.value = 0;
    }
  } catch (err) {
    console.error('API Error:', err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};


const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};




const convertHtmlToSymbols = (html) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = html;

  const tagMappings = {
    'sup': (element) => `^(${element.innerText})`,
    'sub': (element) => `_${element.innerText}`,
    'b': (element) => `**${element.innerText}**`,
    'i': (element) => `*${element.innerText}*`,
    'u': (element) => `_${element.innerText}_`,
    'blockquote': (element) => `> ${element.innerText}`,
    'li': (element) => `• ${element.innerText}`,
    'h1': (element) => `# ${element.innerText}`,
    'h2': (element) => `## ${element.innerText}`,
    'h3': (element) => `### ${element.innerText}`,
    'h4': (element) => `#### ${element.innerText}`,
    'h5': (element) => `##### ${element.innerText}`,
    'h6': (element) => `###### ${element.innerText}`,
    'br': () => `\n` 
  };

  Object.keys(tagMappings).forEach(tag => {
    tempElement.querySelectorAll(tag).forEach(element => {
      const replacement = document.createTextNode(tagMappings[tag](element));
      element.parentNode.replaceChild(replacement, element);
    });
  });


  return (tempElement.textContent || tempElement.innerText || "").replace(/\\n/g, '\n');
};

const formattedQuestion = computed(() => selectedQuestion.value ? convertHtmlToSymbols(selectedQuestion.value.question) : '');
const formattedAnswers = computed(() => {
  return selectedQuestion.value?.answers?.map(answer => convertHtmlToSymbols(answer.answer)) || [];
});



const updateAnswer = (event) => {
  answer.value = event.target.innerText;
};
const formattedQuestions = computed(() => {
  return questions.value.map(question => ({
    ...question,
    formattedText: convertHtmlToSymbols(question.question)
  }));
});


onMounted(async () => {
  await fetchQuestions();
  
});

</script>

<style lang="scss" scoped>
@import  url('https://fonts.googleapis.com/icon?family=Material+Icons');




::v-deep(.myButton){
  
  .p-button{
    background: rgb(29 78 216 / var(--tw-bg-opacity)) !important;
    color: white;
    border: 1px solid rgb(29 78 216 / var(--tw-bg-opacity)) !important;
  }
  .p-button:hover{
    color: white;
    background: #2563eb !important;
    color: white;
  }
}
</style>
