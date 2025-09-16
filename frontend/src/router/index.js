import { createRouter, createWebHistory } from 'vue-router'
import { globalAuthStore } from '@/stores/useAuth.js'
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

router.beforeEach((to, from, next) => {
  const firstRole = globalAuthStore.auth.value?.roles?.[0]

  if (to.meta.requiresAuth && firstRole !== 2001) {
    next('/login')
  } else {
    next()
  }
})
export default router