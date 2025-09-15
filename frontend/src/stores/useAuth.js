// authStore.js
import { ref, inject } from 'vue'

// Create a symbol for the auth context
export const AuthSymbol = Symbol('Auth')

// Auth state - this will be provided at the app level
export function createAuthStore() {
    const auth = ref({})

    const setAuth = (newAuth) => {
        auth.value = newAuth;
        console.log("=== AUTH SET ===")
        console.log("Username:", auth.value.user)
        console.log("Roles:", auth.value.roles)
        console.log("Access Token:", auth.value.accessToken)


        console.log("================")


        const firstRole = auth.value.roles[0];
        console.log("First role number:", firstRole);  // Will show: 2001

    }

    const clearAuth = () => {
        auth.value = {};
        console.log("none logg")
        console.log(auth.value)
    }

    return {

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