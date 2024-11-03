import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useQuestionStore = defineStore('questionStore', () => {
  const questions = ref([]); 
  const selectedQuestion = ref(null);
  const loading = ref(false);
  const error = ref(null);

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
      if (questions.value.length > 0) {
        selectedQuestion.value = questions.value[0]; 
      }
      
    } catch (err) {
      console.error('API Error:', err);
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchLatestQuestion = async () => {
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

      const latestQuestion = response.data.data[0];
      if (latestQuestion) {
        const isAlreadyInList = questions.value.some(q => q.id === latestQuestion.id);
        if (!isAlreadyInList) {
          questions.value.unshift(latestQuestion); 
        }
      }

    } catch (err) {
      console.error('API Error fetching latest question:', err);
      error.value = err.message;
    }
  };

  return { questions, selectedQuestion, loading, error, fetchQuestions, fetchLatestQuestion };
});
