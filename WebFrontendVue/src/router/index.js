import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/about/AboutView.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/contact/ContactView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
