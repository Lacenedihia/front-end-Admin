// authStore.js
import { ref, inject } from 'vue'

// Create a symbol for the auth context
export const AuthSymbol = Symbol('Auth')

// Auth state - this will be provided at the app level
export function createAuthStore() {
    const auth = ref({})

    const setAuth = (newAuth) => {
        auth.value = newAuth
    }

    const clearAuth = () => {
        auth.value = {}
    }

    return {
        auth,
        setAuth,
        clearAuth
    }
}

// Auth consumer hook - use this in components
export function useAuth() {
    const context = inject(AuthSymbol)
    if (!context) {
        throw new Error('useAuth must be used within a component that has auth provided')
    }
    return context
}