import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './store';
import './assets/tailwind.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue';
import axios from 'axios';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import '@mdi/font/css/materialdesignicons.min.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';




const notyf = new Notyf();


const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;  




const app= createApp(App);
const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: isSystemDark ? 'dark' : 'light',
        themes: {
          dark: {
            dark: true,
          },
          light: {
            dark: false,
          },
        },
      },
});

app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(CkeditorPlugin);
app.use(ElementPlus);
app.use(PrimeVue, {
  theme: {
      preset: Aura,
      options: {
        prefix: 'p',
        darkModeSelector: 'system',
        cssLayer: false
    }
  }
});
app.use(ToastService);
app.use(ConfirmationService);


app.mount('#app');
