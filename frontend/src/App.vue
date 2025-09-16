
<script>
import { RouterView } from 'vue-router'
import { provide, computed } from 'vue'
import { createAuthStore, AuthSymbol } from '@/stores/useAuth.js'
import Header from '@/components/Header.vue'
import NavItems from '@/components/NavItems.vue'
import Footer from '@/components/Footer.vue'
import { globalAuthStore } from '@/stores/useAuth.js'

export default {
  name: "App",
  components: {
    Header,
    Footer,
    NavItems,
    RouterView
  },
  
  setup() {
    // Create and provide the auth store
    const authStore = createAuthStore()
    provide(AuthSymbol, authStore)
    
    // Create a computed property for firstRole that's reactive
    const firstRole = computed(() => {
      return globalAuthStore.auth.value?.roles?.[0]
    })
    
    // Create a computed property to check if user is admin
    const isAdmin = computed(() => {
      return firstRole.value === 2001
    })
    
    // Return properties to be used in template
    return {
      firstRole,
      isAdmin
    }
  }
}
</script>

<template>
  <!-- Admin layout (only shown for admin users) -->
  <div v-if="isAdmin" class="app-layout">
    <aside class="sidebar">
      <NavItems />
    </aside>
    
    <div class="content-wrapper">
      <Header />
      <RouterView />
    </div>
    <Footer />
  </div>
  
  <!-- Non-admin layout or login -->
  <div v-else>
    <RouterView />
  </div>
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