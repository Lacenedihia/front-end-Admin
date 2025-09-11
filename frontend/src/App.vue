<script setup>
import { RouterView } from 'vue-router'
import { provide } from 'vue'
import { createAuthStore, AuthSymbol } from '@/stores/useAuth.js'

// Create and provide the auth store
const authStore = createAuthStore()
provide(AuthSymbol, authStore)

</script>

<template>
  
  
      <router-view />
   
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.content-wrapper .header {
  flex: none;
  width: 100%;
}

.main-content {
  flex: 1;
  padding: 20px;
  background: var(--light);
  display: flex;
  flex-direction: column;
  gap: 16px;
}
:root {
  --primary: #4ac0de;
  --primary-alt: #d2dee0;
  --grey: #adc0da;
  --dark: #d0daeb;
  --dark-alt: #d0d5dd;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}
</style>