<template>
  <div class="flex justify-center fixed bottom-0 w-full bg-gray-900 h-16 shadow-lg">
    <div class="flex w-full justify-around items-center text-white">
      <!-- Resim Çek Butonu -->
      <button
        @click="chooseCategory=true"
        type="button"
        :class="value === 1 ? 'text-white bg-blue-700' : 'text-gray-400'"
        class="flex flex-col items-center space-y-1 hover:bg-gray-800 rounded-lg transition duration-200 px-3 py-2"
      >
        <span class="material-icons">photo_camera</span>
        <span>Resim Çek</span>
      </button>

      <!-- Resim Ekle Butonu -->
      <button
        @click="chooseCategory2=true"
        type="button"
        :class="value === 2 ? 'text-white bg-blue-700' : 'text-gray-400'"
        class="flex flex-col items-center space-y-1 hover:bg-gray-800 rounded-lg transition duration-200 px-3 py-2"
      >
        <span class="material-icons">add_photo_alternate</span>
        <span>Resim Ekle</span>
      </button>

      <!-- Metin Ekle Butonu -->
      <button
        @click="chooseCategory3=true"
        type="button"
        :class="value === 3 ? 'text-white bg-blue-700' : 'text-gray-400'"
        class="flex flex-col items-center space-y-1 hover:bg-gray-800 rounded-lg transition duration-200 px-3 py-2"
      >
      <font-awesome-icon :icon="faFileLines" class="h-5" />
        <span>Metin Ekle</span>
      </button>
    </div>
  </div>
  

  <div v-if="chooseCategory" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 p-14 rounded-lg shadow-lg relative w-11/12 md:w-9/12 md:h-5/6">
      <button @click="closeCamera" class="absolute top-2 right-2 p-2 text-gray-900 dark:text-white hover:text-black hover:bg-red-600 border-2 border-red-600 rounded-md">
        <span class="material-icons">close</span>
      </button>
      <lists-component :categories="categories"></lists-component>
      <div class="flex mt-4">
        <button @click="startCamera" class="px-4 mx-auto py-2 bg-blue-500 text-white rounded-lg">Sonraki adım</button>
      </div>
    </div>
  </div>
  <div v-if="chooseCategory2" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 p-14 rounded-lg shadow-lg relative w-11/12 md:w-9/12 md:h-5/6">
      <lists-component :categories="categories"></lists-component>
      <div class="flex mt-4">
        <button @click="selectImage" class="px-4 mx-auto py-2 bg-blue-500 text-white rounded-lg">Sonraki adım</button>
      </div>
    </div>
  </div>
  <div v-if="chooseCategory3" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 p-14 rounded-lg shadow-lg relative w-11/12 md:w-9/12 md:h-5/6">
      <lists-component :categories="categories"></lists-component>
      <div class="flex mt-4">
        <button @click="openTextModal" class="px-4 mx-auto py-2 bg-blue-500 text-white rounded-lg">Sonraki adım</button>
      </div>
    </div>
  </div>
  <div v-if="isCameraOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 p-14 rounded-lg shadow-lg relative w-11/12 md:w-9/12 md:h-5/6">
      <button @click="closeCamera" class="absolute top-2 right-2 p-2 text-gray-900 dark:text-white hover:text-black hover:bg-red-600 border-2 border-red-600 rounded-md">
        <span class="material-icons">close</span>
      </button>
      <video ref="videoElement" class="w-full h-full object-contain mb-4"></video>
      <div class="flex mt-4">
        <button @click="captureImage" class="px-4 mx-auto py-2 bg-blue-500 text-white rounded-lg">Fotoğraf Çek</button>
      </div>
    </div>
  </div>

  <div v-if="imageToCrop" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
    <div class="light:bg-white dark:bg-gray-800 p-14 rounded-lg shadow-lg relative w-11/12 h-5/6 md:w-9/12 md:h-5/6">
      <button @click="closeModal" class="absolute top-2 right-2 p-2 z-10 light:text-gray-900 dark:text-white hover:text-black hover:bg-red-600 border-2 border-red-600 rounded-md">
        <font-awesome-icon :icon="faTimes" class="w-4 h-4" />
      </button>

      <div class="overflow-hidden h-full flex flex-col justify-center items-center">
        <img ref="imageElement" :src="imageToCrop" alt="Kırpılacak Resim" class="max-h-full max-w-full object-contain" />
        <div class="flex mt-4">
          <button @click="cropImage" class="px-4 py-2 bg-blue-500 text-white rounded-lg text-center mx-auto">Kırp ve Gönder</button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="isTextModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-90 shadow-2xl flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 p-14 rounded-lg shadow-lg relative w-11/12 md:w-9/12">
      <button @click="closeTextModal" class="absolute top-2 right-2 p-2 text-gray-900 dark:text-white hover:text-black hover:bg-red-600 border-2 border-red-600 rounded-md">
        <span class="material-icons">close</span>
      </button>
      <div class="w-full h-96 relative">
          <ck-editor v-model="richTextContent"></ck-editor>
        <div class="flex mt-4">
          <button @click="submitText" class="px-4 py-2 bg-blue-500 text-white rounded-lg text-center mx-auto">Gönder</button>
        </div>
      </div>
    </div>
  </div>

  <input type="file" ref="fileInput" accept="image/*" class="hidden" @change="handleImageUpload" />
</template>
  
  <script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCamera, faImage, faFileLines, faTimes } from '@fortawesome/free-solid-svg-icons';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import CkEditor from '../ck-editor/CkEditor.vue';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import ListsComponent from '../containment/ListsComponent.vue';


// import { QuillEditor } from '@vueup/vue-quill';

// import '@vueup/vue-quill/dist/vue-quill.snow.css';

const categories = ref([]);
const imageToCrop = ref(null);
const imageElement = ref(null);
const fileInput = ref(null);
const videoElement = ref(null);
const isCameraOpen = ref(false);
const isTextModalOpen = ref(false);
const richTextContent = ref('');
const chooseCategory = ref(false);
const chooseCategory2 = ref(false);
const chooseCategory3 = ref(false);
let cropper = null;
let stream = null;


const notyf = new Notyf({
    duration: 4000, 
    position: { x: 'left', y: 'bottom' }, 
    dismissible: true, 
});


const fetchCategories = async () => {
  try {
    const response = await fetch("/api/v1/questions/category/list/tree");
    if (response.ok) {
      const data = await response.json();
      categories.value = data.data;
      console.error("API hatası:", response.status);
    }
  } catch (error) {
    console.error("Bağlantı hatası:", error);
  }
};

onMounted(fetchCategories);

const startCamera = async () => {
  try {
    isCameraOpen.value = true;
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.value.srcObject = stream;
    await videoElement.value.play();
    chooseCategory.value=false
  } catch (error) {
    console.error('Kamerayı başlatma hatası:', error);
    notyf.error('Kamera açılamadı. Lütfen kameranın bağlı olduğundan ve kullanılabilir olduğundan emin olun.');
  }
};

const closeCamera = () => {
  isCameraOpen.value = false;
  chooseCategory.value=false
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
};

const captureImage = async () => {
  if (videoElement.value) {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.value.videoWidth;
    canvas.height = videoElement.value.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoElement.value, 0, 0, canvas.width, canvas.height);

    imageToCrop.value = canvas.toDataURL('image/png');
    closeCamera();
    await nextTick();
    initializeCropper();
  }
};

const selectImage = () => {
  fileInput.value.click();
  chooseCategory2.value=false
};

const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = async () => {
      imageToCrop.value = reader.result;
      await nextTick();
      initializeCropper();
    };
    reader.readAsDataURL(file);
  }
};

const initializeCropper = () => {
  if (cropper) {
    cropper.destroy();
  }
  cropper = new Cropper(imageElement.value, {
    aspectRatio: NaN,
    viewMode: 0,
  });
};

const cropImage = () => {
  if (cropper) {
    const canvas = cropper.getCroppedCanvas({
      width: 1024,
      height: 1024,
    });
    const croppedImage = canvas.toDataURL('image/jpeg', 0.9);
    uploadImage(croppedImage);
  }
};

const closeModal = () => {
  imageToCrop.value = null;
  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
};

const openTextModal = () => {
  isTextModalOpen.value = true;
  chooseCategory3.value=false
};

const closeTextModal = () => {
  isTextModalOpen.value = false;
};

const submitText = () => {
  console.log('Kullanıcı Metni:', richTextContent.value);
  
};

import axios from 'axios';

const uploadImage = async (base64Image) => {
  try {
    const selectedCategory = localStorage.getItem("selectedCategory");
    let categoryId = null;

    if (selectedCategory) {
      try {
        const categoryObj = JSON.parse(selectedCategory);
        categoryId = categoryObj.id;
        console.log("Kategori ID:", categoryId);
      } catch (error) {
        console.error("Geçersiz JSON formatı:", error);
        throw new Error("Kategori verisi geçersiz.");
      }
    }

    if (!categoryId) {
      throw new Error("Kategori ID bulunamadı.");
    }
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token bulunamadı");
    }

    const byteString = atob(base64Image.split(',')[1]);
    const mimeString = base64Image.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    const file = new File([blob], "question_image.jpg", { type: mimeString });

    const formData = new FormData();
    formData.append("QuestionImage", file);  
    formData.append("CategoryId", categoryId.toString()); 

    const response = await fetch('https://btkbackend.randevuburada.com/api/v1/questions/add', {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`, 
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API hatası: ${response.status}`);
    }

    const result = await response.json();
    console.log('API yanıtı:', result);
    if (result.status == 1) {
      notyf.success(result.message);
    } else {
      notyf.error(result.message);
    }

  } catch (error) {
    console.error('Yükleme hatası:', error);
    notyf.error('Bir hata oluştu, lütfen tekrar deneyin.');
  }
};






</script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  </style>
  