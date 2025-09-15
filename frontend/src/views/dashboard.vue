<template>
  <section>
    <h1>Home</h1>
    <br />
    <p>You are logged in!</p>
    <br />
    <router-link to="/editor">Go to the Editor page</router-link>
    <br />
    <router-link to="/admin">Go to the Admin page</router-link>
    <br />
    

  

  </section>
    <button class="Btn" @click="logout">
  
  <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
  
  <div class="text">Logout</div>
</button>

</template>

<script>
import { useAuth } from '@/stores/useAuth.js';
import { useRouter } from 'vue-router';
import axios from '@/api/axios';

const LOGOUT_URL = '/logout';

export default {
  name: 'dashboard',
  setup() {
    const { clearAuth } = useAuth();
    const router = useRouter();
    
    const logout = async () => {
      try {
        // Change from POST to GET - no body needed for GET
        const response = await axios.get(LOGOUT_URL, {
          withCredentials: true  // This ensures cookies are sent
        });
        
        // Only clear auth AFTER successful logout
        clearAuth();
        console.log("logout successful");
        router.push('/login');
        
      } catch (err) {
        console.error("Logout error:", err);
        
        // Even if logout fails on server, clear local auth state
        clearAuth();
        router.push('/login');
        
        let errorMessage = 'Logout Failed';
        if (!err.response) {
          errorMessage = 'No Server Response';
        } else if (err.response.status === 400) {
          errorMessage = 'Bad Request';
        } else if (err.response.status === 401) {
          errorMessage = 'Unauthorized';
        } else if (err.response.status === 404) {
          errorMessage = 'Logout endpoint not found';
        } else if (err.response.status === 500) {
          errorMessage = 'Server Error - Please try again later';
        }
        
        console.error(errorMessage);
      }
    };
    
    return {
      logout
    };
  }
};
</script>

<style scoped>
.Btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: .3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: rgb(255, 65, 65);
}

/* plus sign */
.sign {
  width: 100%;
  transition-duration: .3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign svg {
  width: 17px;
}

.sign svg path {
  fill: white;
}
/* text */
.text {
  position: absolute;
  right: 0%;
  width: 0%;
  opacity: 0;
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  transition-duration: .3s;
}
/* hover effect on button width */
.Btn:hover {
  width: 150px;
  border-radius: 40px;
  transition-duration: .3s;
}

.Btn:hover .sign {
  width: 20%;
  transition-duration: .3s;
  padding-left: 20px;
}
/* hover effect button's text */
.Btn:hover .text {
  opacity: 1;
  width: 70%;
  transition-duration: .3s;
  padding-right: 12px;
}
/* button click effect*/
.Btn:active {
  transform: translate(2px ,2px);
}
</style>
       
