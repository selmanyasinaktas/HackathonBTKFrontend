<template>
    <div class="w-full h-full pb-64">
        <QuillEditor :modules="modules" toolbar="full" />
    </div>
  </template>
  
  <script setup>
import { ref, defineComponent } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import BlotFormatter from 'quill-blot-formatter'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
  
  const content = ref('');
  
  const modules = {
      name: 'blotFormatter',  
      module: BlotFormatter, 
      options: {/* options */}
    }
  </script>
  
  <style scoped>
 
  </style>
  