<template>
  <div>
    <div class="grid grid-cols-1 mt-10 md:grid-cols-3 text-center gap-10">
      <!-- Resim Çek Butonu -->
      <button
        @click="startCamera"
        type="button"
        class="text-blue-700 border-2 border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-4 text-center flex flex-col items-center justify-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500 w-full h-60"
      >
        <font-awesome-icon :icon="faCamera" class="w-16 h-16 mb-2" />
        <span>Resim Çek</span>
      </button>

      <!-- Resim Ekle Butonu -->
      <button
        @click="selectImage"
        type="button"
        class="text-blue-700 border-2 border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-4 text-center flex flex-col items-center justify-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500 w-full h-60"
      >
        <font-awesome-icon :icon="faImage" class="w-16 h-16 mb-2" />
        <span>Resim Ekle</span>
      </button>

      <!-- Metin Ekle Butonu -->
      <button
        @click="openTextModal"
        type="button"
        class="text-blue-700 border-2 border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-4 text-center flex flex-col items-center justify-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500 w-full h-60"
      >
        <font-awesome-icon :icon="faFileLines" class="w-16 h-16 mb-2" />
        <span>Metin Ekle</span>
      </button>
    </div>

    <!-- Kamera Modalı -->
    <div v-if="isCameraOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div class="light:bg-white dark:bg-gray-800 p-14 rounded-lg shadow-lg relative w-11/12 md:w-9/12 md:h-5/6">
        <button @click="closeCamera" class="absolute top-2 right-2 p-2 z-10 light:text-gray-900 dark:text-white hover:text-black hover:bg-red-600 border-2 border-red-600 rounded-md">
          <font-awesome-icon :icon="faTimes" class="w-4 h-4" />
        </button>
        <video ref="videoElement" class="w-full h-full  object-contain mb-4"></video>
        <div class="flex mt-4">
        <button @click="captureImage" class="px-4 mx-auto py-2 bg-blue-500 text-white rounded-lg">Fotoğraf Çek</button>
      </div>
      </div>
    </div>

    <!-- Kırpma Modalı -->
    <div v-if="imageToCrop" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div class="light:bg-white dark:bg-gray-800 p-14 rounded-lg shadow-lg relative w-11/12 h-5/6 md:w-9/12 md:h-5/6">
        <!-- Kapatma Butonu -->
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

    <!-- Metin Ekleme Modalı -->
<div v-if="isTextModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-90 shadow-2xl flex items-center justify-center z-50">
  <div class="light:bg-white dark:bg-gray-800 p-14 rounded-lg shadow-lg relative w-11/12  md:w-9/12">
    <button @click="closeTextModal" class="absolute top-2 right-2 p-2 z-10 light:text-gray-900 dark:text-white hover:text-black hover:bg-red-600 border-2 border-red-600 rounded-md">
      <font-awesome-icon :icon="faTimes" class="w-4 h-4" />
    </button>
        <div class="w-full h-96 relative pb-14">
        <!-- <QuillEditor v-model:content="richTextContent" toolbar="essential" contentType="text"/> -->
         <ck-editor v-model="richTextContent"></ck-editor>
        <div class="flex mt-4">
      <button @click="submitText" class="px-4 py-2 bg-blue-500 text-white rounded-lg text-center mx-auto relative">Gönder</button>
    </div>
        </div>
    
  </div>
</div>



    <!-- Dosya Seçici -->
    <input type="file" ref="fileInput" accept="image/*" class="hidden" @change="handleImageUpload" />
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCamera, faImage, faFileLines, faTimes } from '@fortawesome/free-solid-svg-icons';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import CkEditor from '../ck-editor/CkEditor.vue';
// import { QuillEditor } from '@vueup/vue-quill';

// import '@vueup/vue-quill/dist/vue-quill.snow.css';


const imageToCrop = ref(null);
const imageElement = ref(null);
const fileInput = ref(null);
const videoElement = ref(null);
const isCameraOpen = ref(false);
const isTextModalOpen = ref(false);
const richTextContent = ref('');
let cropper = null;
let stream = null;





const startCamera = async () => {
  try {
    isCameraOpen.value = true;
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.value.srcObject = stream;
    await videoElement.value.play();
  } catch (error) {
    console.error('Kamerayı başlatma hatası:', error);
    alert('Kamera açılamadı. Lütfen kameranın bağlı olduğundan ve kullanılabilir olduğundan emin olun.');
  }
};

const closeCamera = () => {
  isCameraOpen.value = false;
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
};

const closeTextModal = () => {
  isTextModalOpen.value = false;
};

const submitText = () => {
  console.log('Kullanıcı Metni:', richTextContent.value);
  // Metni backend'e yüklemek isterseniz:
  // uploadText(richTextContent.value);
};

const uploadImage = async (base64Image) => {
  try {
    const response = await fetch(
      'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBxbSqxoqTKByY1MAcyHHbPXBjB7zNleSI',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64Image.split(',')[1],
              },
              features: [
                {
                  type: 'TEXT_DETECTION',
                },
              ],
            },
          ],
        }),
      }
    );

    const result = await response.json();
    console.log('Görüntü işlendikten sonra elde edilen data:', result);

    if (response.ok && result.responses[0].fullTextAnnotation) {
      const recognizedText = result.responses[0].fullTextAnnotation.text;
      console.log('Görüntü işlendikten sonra elde edilen text:', recognizedText);

    } else {
      alert('Resim yüklenemedi, lütfen tekrar deneyin.');
    }
  } catch (error) {
    console.error('Yükleme hatası:', error);
    alert('Bir hata oluştu, lütfen tekrar deneyin.');
  }
};

</script>

<style scoped>
</style>
