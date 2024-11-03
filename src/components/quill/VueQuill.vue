<!-- <template>
  <div class="w-full h-full pb-64">
    <QuillEditor :modules="modules" v-model="content" @blur="emitContent" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import BlotFormatter from 'quill-blot-formatter';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

// 'defineProps' ve 'defineEmits' makro olarak Vue tarafından tanınıyor.
// Bu nedenle import etmeye gerek yok.
const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const content = ref(props.modelValue);

watch(content, (newValue) => {
  emit('update:modelValue', newValue);
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== content.value) {
      content.value = newValue;
    }
  }
);

const modules = {
  name: 'blotFormatter',
  module: BlotFormatter,
  options: { /* options */ }
};
</script>

<style scoped>
/* Stil tanımları buraya */
</style> -->
