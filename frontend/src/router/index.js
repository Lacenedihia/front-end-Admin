import { createRouter, createWebHistory } from 'vue-router'

//import { useStore } from "@/stores/index.js"; // Update with your actual store path

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
      title: "Login",

    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
