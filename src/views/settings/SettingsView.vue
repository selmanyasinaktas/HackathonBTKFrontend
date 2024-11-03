<template>
      <div class="min-h-screen pt-5 text-black dark:text-white">
    <el-tabs v-model="activeName" class="demo-tabs place-self-center min-w-[60%] max-h-[90vh] text-black dark:text-white" @tab-click="handleClick">
      <!-- Kullanıcı Bilgisi Tabı -->
      <el-tab-pane label="Kullanıcı" name="first">
        <div class="flex justify-center bg-white dark:!bg-gray-800 p-6">
          <div class="w-full max-w-md bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center p-2">Kullanıcı Bilgileri</h2>
            <form @submit.prevent="updateUserInfo">
              <!-- Ad -->
              <div class="mb-4">
                <label class="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">Ad</label>
                <el-input
                  class="!bg-white dark:!bg-gray-800 border-gray-800 border rounded-md"
                  v-model="user.firstName"
                  placeholder="Adınızı girin"
                  @blur="v$.firstName.$touch()"
                  :class="{ 'border-red-500': v$.firstName.$invalid && v$.firstName.$dirty }"
                />
                <div v-if="v$.firstName.$invalid && v$.firstName.$dirty" class="text-sm text-red-600 dark:text-red-400 mt-1">
                  Ad zorunludur
                </div>
              </div>
              <!-- Soyad -->
              <div class="mb-4">
                <label class="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">Soyad</label>
                <el-input
                  class="!bg-white dark:!bg-gray-800 border-gray-800 border rounded-md"
                  v-model="user.lastName"
                  placeholder="Soyadınızı girin"
                  @blur="v$.lastName.$touch()"
                  :class="{ 'border-red-500': v$.lastName.$invalid && v$.lastName.$dirty }"
                />
                <div v-if="v$.lastName.$invalid && v$.lastName.$dirty" class="text-sm text-red-600 dark:text-red-400 mt-1">
                  Soyad zorunludur
                </div>
              </div>
              <!-- Tel No -->
              <div class="mb-4">
                <label class="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">Telefon Numarası</label>
                <el-input
                  class="!bg-white dark:!bg-gray-800 border-gray-800 border rounded-md"
                  v-model="user.phoneNumber"
                  placeholder="Telefon numaranızı girin"
                  @blur="v$.phoneNumber.$touch()"
                  v-maska="'(###) ###-####'"
                  :class="{ 'border-red-500': v$.phoneNumber.$invalid && v$.phoneNumber.$dirty }"
                />
                <div v-if="v$.phoneNumber.$invalid && v$.phoneNumber.$dirty" class="text-sm text-red-600 dark:text-red-400 mt-1">
                  Telefon numarası zorunludur ve doğru formatta olmalıdır
                </div>
              </div>
              <div class="flex">
                <el-button type="primary" class="mt-4 mx-auto" native-type="submit">Güncelle</el-button>
              </div>
            </form>
          </div>
        </div>
      </el-tab-pane>

      <!-- Email Tabı -->
      <el-tab-pane label="Email" name="second">
  <div class="flex justify-center bg-white dark:!bg-gray-800 p-6">
    <div class="w-full max-w-md bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center p-2">Email Güncelleme</h2>
      <form @submit.prevent="updateEmail">
        <!-- Email -->
        <div class="mb-4">
          <label class="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">Email</label>
          <el-input
            v-model="user.email"
            type="email"
            class="!bg-white dark:!bg-gray-800 border-gray-800 border rounded-md"
            placeholder="Yeni email adresinizi girin"
            @blur="v$.email.$touch()"
            :class="{ 'border-red-500': v$.email.$invalid && v$.email.$dirty }"
          />
          <div v-if="v$.email.$invalid && v$.email.$dirty" class="text-sm text-red-600 dark:text-red-400 mt-1">
            Geçerli bir e-posta adresi girin.
          </div>
        </div>
        
        <!-- Şifre -->
        <div class="mb-4">
          <label class="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">Mevcut Şifre</label>
          <el-input
            v-model="passwordData.currentPassword"
            type="password"
            class="!bg-white dark:!bg-gray-800 border-gray-800 border rounded-md"
            placeholder="Mevcut şifrenizi girin"
            @blur="v$.currentPassword.$touch()"
            :class="{ 'border-red-500': v$.currentPassword.$invalid && v$.currentPassword.$dirty }"
          />
          <div v-if="v$.currentPassword.$invalid && v$.currentPassword.$dirty" class="text-sm text-red-600 dark:text-red-400 mt-1">
            Mevcut şifre zorunludur.
          </div>
        </div>
        
        <div class="flex">
          <el-button type="primary" class="mt-4 mx-auto" native-type="submit">Email Güncelle</el-button>
        </div>
      </form>
    </div>
  </div>
</el-tab-pane>



      <!-- Şifre Tabı -->
      <el-tab-pane label="Şifre" name="third">
        <div class="flex justify-center bg-white dark:!bg-gray-800 p-6">
          <div class="w-full max-w-md bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center p-2">Şifre Güncelleme</h2>
            <form @submit.prevent="updatePassword">
              <!-- Mevcut Şifre -->
              <div class="mb-4">
                <label class="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">Mevcut Şifre</label>
                <el-input
                  v-model="passwordData.currentPassword"
                  type="password"
                  class="!bg-white dark:!bg-gray-800 border-gray-800 border rounded-md"
                  placeholder="Mevcut şifrenizi girin"
                  @blur="v$.currentPassword.$touch()"
                  :class="{ 'border-red-500': v$.currentPassword.$invalid && v$.currentPassword.$dirty }"
                />
                <div v-if="v$.currentPassword.$invalid && v$.currentPassword.$dirty" class="text-sm text-red-600 dark:text-red-400 mt-1">
                  Mevcut şifre zorunludur
                </div>
              </div>
              <!-- Yeni Şifre -->
              <div class="mb-4">
                <label class="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">Yeni Şifre</label>
                <el-input
                  v-model="passwordData.newPassword"
                  type="password"
                  class="!bg-white dark:!bg-gray-800 border-gray-800 border rounded-md"
                  placeholder="Yeni şifrenizi girin"
                  @blur="v$.newPassword.$touch()"
                  :class="{ 'border-red-500': v$.newPassword.$invalid && v$.newPassword.$dirty }"
                />
                <div v-if="v$.newPassword.$invalid && v$.newPassword.$dirty" class="text-sm text-red-600 dark:text-red-400 mt-1">
                  Yeni şifre en az 6 karakter olmalıdır
                </div>
              </div>
              <!-- Yeni Şifre Tekrarı -->
                <div class="mb-4">
                <label class="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">Yeni Şifre (Tekrar)</label>
                <el-input
                    v-model="passwordData.confirmNewPassword"
                    type="password"
                    class="!bg-white dark:!bg-gray-800 border-gray-800 border rounded-md"
                    placeholder="Yeni şifrenizi tekrar girin"
                    @blur="v$.confirmNewPassword.$touch()"
                    :class="{ 'border-red-500': v$.confirmNewPassword.$invalid && v$.confirmNewPassword.$dirty }"
                />
                <div v-if="v$.confirmNewPassword.$invalid && v$.confirmNewPassword.$dirty" class="text-sm text-red-600 dark:text-red-400 mt-1">
                    Yeni şifreler aynı olmalıdır.
                </div>
                </div>

              <div class="flex">
                <el-button type="primary" class="mt-4 mx-auto" native-type="submit">Şifre Güncelle</el-button>
              </div>
            </form>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
  </template>
  
  <script setup lang="ts">
    import { inject, ref, reactive, toRefs } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import { vMaska } from 'maska/vue';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength, sameAs } from '@vuelidate/validators';

const notyf = new Notyf({
  duration: 3000,
  position: { x: 'left', y: 'bottom' },
  dismissible: true,
});

const user = inject('user', reactive({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: ''
}));
const passwordData = reactive({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: ''
});
const activeName = ref('first');

const rules = {
  firstName: { required },
  lastName: { required },
  email: { required, email },
  phoneNumber: { required, minLength: minLength(10) },
  currentPassword: { required },
  newPassword: { required, minLength: minLength(6) },
  confirmNewPassword: { required, sameAsNewPassword: sameAs(toRefs(passwordData).newPassword, 'Şifreler eşleşmiyor') } 

};

const v$ = useVuelidate(rules, { ...toRefs(user), ...toRefs(passwordData) });

const updateUserInfo = async () => {
  v$.value.firstName.$touch();
  v$.value.lastName.$touch();
  v$.value.phoneNumber.$touch();
  
  if (v$.value.firstName.$invalid || v$.value.lastName.$invalid || v$.value.phoneNumber.$invalid) {
    notyf.error('Lütfen tüm zorunlu alanları doğru bir şekilde doldurun.');
    return;
  }

  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token bulunamadı");

    const response = await fetch("https://btkbackend.randevuburada.com/api/v1/account/update/user-info", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
      }),
    });

    // console.log("Gönderilen kullanıcı bilgileri:", user.firstName, user.lastName, user.phoneNumber);

    if (!response.ok) throw new Error(`Güncelleme hatası: ${response.status}`);
    
    notyf.success("Kullanıcı bilgileri başarıyla güncellendi!");
  } catch (error) {
    console.error("Kullanıcı bilgileri güncelleme isteği hatası:", error);
    notyf.error("Kullanıcı bilgileri güncelleme isteği hatası");
  }
};


const updateEmail = async () => {
  v$.value.email.$touch();
  v$.value.currentPassword.$touch();
  
  if (v$.value.email.$invalid || v$.value.currentPassword.$invalid) {
    notyf.error('Email veya şifre bilgisi eksik veya hatalı.');
    return;
  }

  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token bulunamadı!");

    const response = await fetch("https://btkbackend.randevuburada.com/api/v1/account/update/mail", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newEmail: user.email,
        currentPassword: passwordData.currentPassword, 
      }),
    });

    if (!response.ok) throw new Error(`Güncelleme hatası: ${response.status}`);
    notyf.success("Email başarıyla güncellendi!");
  } catch (error) {
    console.error("Email güncelleme isteği hatası:", error);
    notyf.error("Email güncelleme isteği hatası.");
  }
};



const updatePassword = async () => {
  v$.value.currentPassword.$touch();
  v$.value.newPassword.$touch();
  v$.value.confirmNewPassword.$touch();
  
  if (v$.value.currentPassword.$invalid || v$.value.newPassword.$invalid || v$.value.confirmNewPassword.$invalid) {
    notyf.error('Şifre bilgisi eksik veya hatalı.');
    return;
  }


  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token bulunamadı!");

    const response = await fetch("https://btkbackend.randevuburada.com/api/v1/account/update/password", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmNewPassword,
      }),
    });



    if (!response.ok) throw new Error(`Şifre güncelleme hatası: ${response.status}`);
    notyf.success("Şifre başarıyla güncellendi!");
  } catch (error) {
    console.error("Şifre güncelleme isteği hatası:", error);
    notyf.error("Şifre güncelleme isteği sırasında bir hata oluştu.");
  }
};

  
  const handleClick = (tab: TabsPaneContext, event: Event) => {
  };
  </script>
  
  <style>
  .demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 16px;
  }

.el-input{
    --el-input-bg-color:  @apply bg-gray-800;

}
.el-tabs__item {
    --el-text-color-primary: @apply text-white
}
.el-input__wrapper {
    box-shadow: 0 0 0 0px;
    
}
.el-input__wrapper:hover {
    box-shadow: 0 0 0 1px;
    
}
.el-input__wrapper.is-focus {
    box-shadow: 0 0 0 1px var(--el-color-primary);
    
}
  </style>