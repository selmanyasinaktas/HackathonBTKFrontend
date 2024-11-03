<template>
    <div class="dark:bg-gray-800 min-h-screen">
      <user-navbar />  
      <main>
        
        <router-view />
          
      </main>
      <bottom-navbar></bottom-navbar>
    </div>
  </template>
  
  <script setup>
  import UserNavbar from '../components/navigation/UserNavbar.vue';
  import BottomNavbar from '../components/navigation/BottomNavbar.vue';
  import { ref, reactive, provide, onMounted } from 'vue';

  const user = reactive({
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: ''
});

const fetchUserInfo = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token bulunamadı!");

    const response = await fetch("/api/v1/account/user-info", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error(`API hatası: ${response.status}`);

    const data = await response.json();
    user.firstName = data.data.firstName;
    user.lastName = data.data.lastName;
    user.phoneNumber = data.data.phoneNumber;
    user.email = data.data.email;
  } catch (error) {
    console.error("İstek hatası:", error);
  }
};

onMounted(fetchUserInfo);
provide('user', user); 

</script>
  
  <style scoped>
  </style>
  