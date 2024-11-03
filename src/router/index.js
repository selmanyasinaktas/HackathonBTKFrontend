import { createRouter, createWebHistory } from 'vue-router';

const VisitorLayout = () => import('../layouts/VisitorLayout.vue');
const UserLayout = () => import('../layouts/UserLayout.vue');
const AuthLayout = () => import('../layouts/AuthLayout.vue');

const HomeView = () => import('../views/home/HomeView.vue');
const AboutView = () => import('../views/about/AboutView.vue');
const ContactView = () => import('../views/contact/ContactView.vue');
const RegisterView = () => import('../views/register/RegisterView.vue');
const LoginView = () => import('../views/login/LoginView.vue');
const QuestionsView = () => import('../views/dashboard/DashboardView.vue');
const SettingsView = () => import('../views/settings/SettingsView.vue'); 

const routes = [
  {
    path: '/',
    component: VisitorLayout,
    children: [
      { path: '', redirect: '/home' },
      { path: 'home', component: HomeView },
      { path: 'about', component: AboutView },
      { path: 'contact', component: ContactView },
    ],
    meta: { requiresAuth: false }, 
  },

  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'login', component: LoginView },
      { path: 'register', component: RegisterView },
    ],
    meta: { requiresAuth: false },
  },

  {
    path: '/user',
    component: UserLayout,
    children: [
      { path: 'questions', component: QuestionsView },
      { path: 'home', component: HomeView },
      { path: 'about', component: AboutView },
      { path: 'contact', component: ContactView },
      { path: 'settings', component: SettingsView },
    ],
    meta: { requiresAuth: true }, 
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      next('/auth/login');
    } else {
      next();
    }
  } else {
    if (isAuthenticated && ['/home', '/about', '/contact'].includes(to.path)) {
      next('/user/questions'); 
    } else {
      next();
    }
  }
});

export default router;
