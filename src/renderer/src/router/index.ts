import { createRouter, createWebHashHistory } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue';

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
      },
      {
        path: 'settings/reminder',
        name: 'ReminderSettings',
        component: () => import('../views/ReminderSettings.vue'),
      },
      {
        path: 'settings/app',
        name: 'AppSettings',
        component: () => import('../views/AppSettings.vue'),
      },
    ],
  },
  {
    path: '/break',
    name: 'Break',
    component: () => import('../views/Break.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
