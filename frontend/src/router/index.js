import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: {
      title: "Login",
    }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/register.vue"),
    meta: {
      title: "register",
    }
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/dashboard.vue"),
    meta: {
      title: "dashboard",
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Add this to debug navigation
router.beforeEach((to, from, next) => {
  console.log('Navigating from:', from.path, 'to:', to.path)
  next()
})

export default router