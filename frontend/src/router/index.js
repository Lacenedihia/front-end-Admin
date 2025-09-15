import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores/useAuth.js';
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "LoginComponent",
    component: () => import("@/views/Login.vue"),
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: "/register",
    name: "registerr",
    component: () => import("@/views/reg.vue"),
    meta: {
      requiresAuth: false,
    }
  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/dashboard.vue"),
    meta: {
      requiresAuth: true,
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})


export default router