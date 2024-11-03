<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white">Kayıt Ol</h2>
            <form @submit.prevent @keydown.enter="handleRegister">
                <div class="space-y-4">
                    <div v-for="(field, key) in fields" :key="key">
                        <label :for="field.id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {{ field.label }}
                        </label>
                        <input
                            v-if="field.mask"
                            :type="field.type"
                            :id="field.id"
                            v-model="user[field.id]"
                            @blur="v$[field.id].$touch()"
                            v-maska="field.mask"
                            :placeholder="field.placeholder"
                            :class="{ 'border-red-500': v$[field.id]?.$invalid && v$[field.id]?.$dirty }"
                            class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                            :required="field.required"
                        />
                        <input
                            v-else
                            :type="field.type"
                            :id="field.id"
                            v-model="user[field.id]"
                            @blur="v$[field.id].$touch()"
                            :placeholder="field.placeholder"
                            :class="{ 'border-red-500': v$[field.id]?.$invalid && v$[field.id]?.$dirty }"
                            class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                            :required="field.required"
                        />
                        <div v-if="v$[field.id]?.$invalid && v$[field.id]?.$dirty"
                            class="text-sm text-red-600 dark:text-red-400 mt-1">
                            {{ field.errorMessage }}
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    @click="handleRegister"
                    v-if="!isLoading"
                    class="w-full py-3 mt-6 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                    Kayıt Ol
                </button>
                <button v-if="isLoading" type="button" class="w-full py-3 px-4 inline-flex items-center justify-center mt-6 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition ease-in-out duration-150 cursor-not-allowed" disabled>
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Kayıt İşlemi Yapılıyor...
          </button>
            </form>
            <router-link to="/auth/login" class="block mt-4 text-center text-sm text-gray-600 dark:text-gray-400 hover:underline">
                Zaten bir hesabınız var mı? Giriş yapın
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength, sameAs } from '@vuelidate/validators';
import { vMaska } from 'maska/vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { User } from '../../models/User';
import { submitHandler } from 'ckeditor5';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';


const notyf = new Notyf({
    duration: 5000, 
    position: { x: 'left', y: 'bottom' }, 
    dismissible: true, 
});


const user = reactive<User>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
});

const rules = {
    firstName: { required },
    lastName: { required },
    email: { required, email },
    password: { required, minLength: minLength(6) },
    confirmPassword: {
        required,
        sameAsPassword: sameAs(toRefs(user).password, 'Şifreler eşleşmiyor')
    },
    phoneNumber: { required, minLength: minLength(10) }
};

const v$ = useVuelidate(rules, toRefs(user));
const isLoading = ref(false);

const fields = [
    { id: 'firstName', label: 'Ad', type: 'text', required: true, placeholder: 'Adınızı girin', errorMessage: 'Ad zorunludur' },
    { id: 'lastName', label: 'Soyad', type: 'text', required: true, placeholder: 'Soyadınızı girin', errorMessage: 'Soyad zorunludur' },
    { id: 'email', label: 'E-posta', type: 'email', required: true, placeholder: 'E-posta adresinizi girin', errorMessage: 'Geçerli bir e-posta adresi girin' },
    { id: 'password', label: 'Şifre', type: 'password', required: true, placeholder: 'Şifrenizi girin', errorMessage: 'Şifre en az 6 karakter olmalıdır' },
    { id: 'confirmPassword', label: 'Şifre Tekrarı', type: 'password', required: true, placeholder: 'Şifrenizi tekrar girin', errorMessage: 'Şifreler eşleşmiyor' },
    {
        id: 'phoneNumber',
        label: 'Telefon Numarası',
        type: 'tel',
        required: true,
        mask: '(###) ###-####',
        placeholder: '(###) ###-####',
        errorMessage: 'Telefon numarası zorunludur ve doğru formatta olmalıdır'
    }
];

const router = useRouter();

async function handleRegister() {
    v$.value.$touch();

    if (v$.value.$invalid) {
        
        fields.forEach(field => {
            const fieldValidation = v$.value[field.id]; 
            if (fieldValidation?.$invalid && fieldValidation?.$dirty) {
                notyf.error(field.errorMessage); 
            }
        });
        return; 
    }
    isLoading.value=true
    try {
        const response = await axios.post('/api/v1/account/register', user);
        notyf.success('Kayıt işlemi başarılı!');
        isLoading.value=false
        router.push('/auth/login');
    } catch (error) {
        notyf.error('Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.');
        isLoading.value=false

    }
}


defineExpose({
  directives: {
    vMaska
  }
});
</script>

<style scoped>
</style>
