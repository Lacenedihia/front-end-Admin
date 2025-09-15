<template>
<!-- Error Popup Toast -->
  <Transition name="toast">
    <div v-if="errMsg" class="error-toast" @click="clearError">
      <div class="toast-content">
        <svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
        <div class="toast-text">
          <h4>Login Failed</h4>
          <p>{{ errMsg }}</p>
        </div>
        <button class="toast-close" @click="clearError">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  </Transition>
<div>
  <div class="scroll-down">SCROLL DOWN
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path d="M16 3C8.832031 3 3 8.832031 3 16s5.832031 13 13 13 13-5.832031 13-13S23.167969 3 16 3zm0 2c6.085938 0 11 4.914063 11 11 0 6.085938-4.914062 11-11 11-6.085937 0-11-4.914062-11-11C5 9.914063 9.914063 5 16 5zm-1 4v10.28125l-4-4-1.40625 1.4375L16 23.125l6.40625-6.40625L21 15.28125l-4 4V9z"/> 
    </svg>
  </div>
  
  <div class="container"></div>
  
  <div class="modal" ref="modalRef">
    
    <form class="modal-container" @submit.prevent="handleSubmit">
      <div class="modal-left">
       
        
        <h1 class="modal-title">Welcome!</h1>
      
        <div class="inputGroup">
         <input 
            type="text" 
            name="email"   
            id="email" 
            placeholder="Email" 
            ref="userRef"
            v-model="user"
            required> 
        </div>
        <div class="inputGroup">
          <input 
            type="password" 
            name="password" 
            id="password" 
            placeholder="Password"   
            v-model="pwd"
            required>
          
          
        </div>
       
        
        <div class="modal-buttons">
          
   <!-- svgIcon -->
    <router-link to="/register" >
<button class="Btn">
  <div class="sign">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
  </div>

  <div class="text">Sign up</div>
</button></router-link>

     <!-- From Uiverse.io by MUJTABA201566 --> 
<button class="Btn" type="submit" >
  <div class="sign">
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z"/></svg></div>
  <div class="text">LogIn</div>
</button>
 
        </div>
        
      </div>
      
      <div class="modal-right">
        <img src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80" alt="Login background">
      </div>
      
      <button type="button" class="icon-button close-button" @click="closeModal">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
          <path d="M 25 3 C 12.86158 3 3 12.86158 3 25 C 3 37.13842 12.86158 47 25 47 C 37.13842 47 47 37.13842 47 25 C 47 12.86158 37.13842 3 25 3 z M 25 5 C 36.05754 5 45 13.94246 45 25 C 45 36.05754 36.05754 45 25 45 C 13.94246 45 5 36.05754 5 25 C 5 13.94246 13.94246 5 25 5 z M 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.980469 15.990234 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 z"></path>
        </svg>
      </button>
    </form>
    
    <button class="modal-button" type="button" @click="openModal">Click here to login</button>
  </div>
</div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { useAuth } from '@/stores/useAuth.js';
import { useRouter } from 'vue-router';
import axios from '@/api/axios';

const LOGIN_URL = '/auth';

export default {
  name: 'LoginComponent',
  setup() {
  
    const {  setAuth } = useAuth();
    const router = useRouter();

    // Refs
    const userRef = ref(null);
    const modalRef = ref(null);

    // Reactive data
    const user = ref('');
    const pwd = ref('');
    const errMsg = ref('');
    const success = ref(false);
    const isOpened = ref(false);

    // Auto-hide error message after 5 seconds
    let errorTimeout = null;

    const clearError = () => {
      errMsg.value = '';
      if (errorTimeout) {
        clearTimeout(errorTimeout);
        errorTimeout = null;
      }
    };

    const showError = (message) => {
      errMsg.value = message;
      
      // Auto-hide after 5 seconds
      if (errorTimeout) clearTimeout(errorTimeout);
      errorTimeout = setTimeout(() => {
        errMsg.value = '';
      }, 5000);
    };

    onMounted(() => {
      if (userRef.value) {
        userRef.value.focus();
      }
      setupModalEvents();
    });

    onUnmounted(() => {
      cleanupModalEvents();
      if (errorTimeout) {
        clearTimeout(errorTimeout);
      }
    });

    const handleSubmit = async () => {
      clearError(); // Clear any existing errors
      
      try {
        const response = await axios.post(LOGIN_URL,
          JSON.stringify({ user: user.value, pwd: pwd.value }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );
        
        console.log(JSON.stringify(response?.data));

        const accessToken = response.data.accessToken;
        const roles = response.data.roles;
        setAuth({ user: user.value, pwd: pwd.value, roles, accessToken });
        
        // Clear form
        user.value = '';
        pwd.value = '';
        success.value = true;
        
        // Redirect to dashboard
        router.push('/dashboard'); 
      } catch (err) {
        let errorMessage = 'Login Failed';
        
        if (!err.response) {
          errorMessage = 'No Server Response';
        } else if (err.response.status === 400) {
          errorMessage = 'Missing Username or Password';
        } else if (err.response.status === 401) {
          errorMessage = 'Unauthorized - Invalid credentials';
        } else if (err.response.status === 500) {
          errorMessage = 'Server Error - Please try again later';
        }
        
        showError(errorMessage);
      }
    };

    const openModal = () => {
      if (modalRef.value) {
        modalRef.value.classList.add("is-open");
        document.body.style.overflow = "hidden";
      }
    };

    const closeModal = () => {
      if (modalRef.value) {
        modalRef.value.classList.remove("is-open");
        document.body.style.overflow = "initial";
      }
      clearError(); // Clear error when closing modal
    };

    let scrollHandler;
    let keyHandler;

    const setupModalEvents = () => {
      const scrollDown = document.querySelector(".scroll-down");
      
      scrollHandler = () => {
        if (window.scrollY > window.innerHeight / 3 && !isOpened.value) {
          isOpened.value = true;
          if (scrollDown) scrollDown.style.display = "none";
          openModal();
        }
      };

      keyHandler = (evt) => {
        if (evt.keyCode === 27) { // ESC key
          closeModal();
        }
      };

      window.addEventListener("scroll", scrollHandler);
      document.addEventListener("keydown", keyHandler);
    };

    const cleanupModalEvents = () => {
      if (scrollHandler) {
        window.removeEventListener("scroll", scrollHandler);
      }
      if (keyHandler) {
        document.removeEventListener("keydown", keyHandler);
      }
      document.body.style.overflow = "initial";
    };

    return {
      userRef,
      modalRef,
      user,
      pwd,
      errMsg,
      success,
      handleSubmit,
      openModal,
      closeModal,
      clearError
    };
  }
};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css?family=Nunito:400,600,700");

* {
  box-sizing: border-box;
}
.icon-button{ fill:#ffffff;}
.icon-button:hover{ fill:#89939a;}
body {
  font-family: "Nunito", sans-serif;
  color: rgba(#000, 0.7);
}


@import url("https://fonts.googleapis.com/css?family=Nunito:400,600,700");

/* Toast/Popup Error Styles */
.error-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 400px;
  min-width: 300px;
  cursor: pointer;
}

.toast-content {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  box-shadow: 
    0 10px 30px rgba(255, 107, 107, 0.3),
    0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.toast-icon {
  width: 24px;
  height: 24px;
  color: white;
  flex-shrink: 0;
  margin-top: 2px;
}

.toast-text {
  flex: 1;
  color: white;
}

.toast-text h4 {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  font-family: "Nunito", sans-serif;
}

.toast-text p {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
  font-family: "Nunito", sans-serif;
  line-height: 1.4;
}

.toast-close {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  flex-shrink: 0;
}

.toast-close:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.toast-close svg {
  width: 16px;
  height: 16px;
}

/* Toast Animation */
.toast-enter-active, .toast-leave-active {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.toast-enter-to, .toast-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

/* Success Toast Variant */
.success-toast .toast-content {
  background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
  box-shadow: 
    0 10px 30px rgba(39, 174, 96, 0.3),
    0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Warning Toast Variant */
.warning-toast .toast-content {
  background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
  box-shadow: 
    0 10px 30px rgba(243, 156, 18, 0.3),
    0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Rest of your existing styles */

.container {
  height: 200vh;
   background-image:  url("./public/walpaper.jpg");
    background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.modal {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.4s;

  &-container {
    display: flex;
    max-width: 720px;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    transition-duration: 0.3s;
    background: #fff;
    transform: translateY(100px) scale(0.4);
  }

  &-title {
    font-size: 26px;
    margin: 0;
    font-weight: 400;
    color: #55311c;
  }

  &-desc {
    margin: 6px 0 30px 0;
  }

  &-left {
    padding: 60px 30px 20px;
    background: #fff;
    flex: 1.5;
    transition-duration: 0.5s;
    transform: translateY(80px);
    opacity: 0;
  }

  &-button {
    color: darken(#dbc5d8, 5%);
    font-family: "Nunito", sans-serif;
    font-size: 18px;
    cursor: pointer;
    border: 0;
    outline: 0;
    padding: 10px 40px;
    border-radius: 30px;
    background: rgb(255, 255, 255);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.16);
    transition: 0.3s;
    
    &:hover {
      border-color: rgba(255, 255, 255, 0.2);
      background: rgba(#fff, 0.8);
    }
  }

  &-right {
    flex: 2;
    font-size: 0;
    transition: 0.3s;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      transform: scale(2);
      object-fit: cover;
      transition-duration: 1.2s;
    }
  }

  &.is-open {
    height: 100%;
    

    .modal-button {
      opacity: 0;
    }

    .modal-container {
      opacity: 1;
      transition-duration: 0.6s;
      pointer-events: auto;
      transform: translateY(0) scale(1);
    }

    .modal-right img {
      transform: scale(1);
    }

    .modal-left {
      transform: translateY(0);
      opacity: 1;
      transition-delay: 0.1s;
      margin-top: 30px;
    }
  }

  &-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      color: rgba(#333, 0.6);
      font-size: 14px;
    }
  }
}

.sign-up {
  margin: 60px 0 0;
  font-size: 14px;
  text-align: center;

  a {
    color: #dbc5d8;
  }
}


.icon-button {
  outline: 0;
  position: absolute;
  right: 10px;
  top: 12px;
  width: 32px;
  height: 32px;
  border: 0;
  background: 0;
  padding: 0;
  cursor: pointer;
}

.scroll-down {
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  font-size: 32px;
  font-weight: 800;
  transform: translate(-50%, -50%);
  svg {
    margin-top: 16px;
    width: 52px;
    fill: currentColor;
  }
}


/* Add your styles here */
* {
  box-sizing: border-box;
}


.modal {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.4s;
}

.modal-container {
  display: flex;
 /* From https://css.glass */
background: rgba(206, 218, 240, 0.68);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(11.3px);
-webkit-backdrop-filter: blur(11.3px);
border: 1px solid rgba(206, 218, 240, 0.11);
  width: 60%;
  height:50%;
  border-radius: 10px;
  overflow: hidden;
  position: absolute;
 
  opacity: 0;
  pointer-events: none;
  transition-duration: 0.3s;
  background: #fff;
  transform: translateY(100px) scale(0.4);
}

.modal-title {
   text-align: center;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  
  font-size: 28px;
  font-weight: 800;

}
p{font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;}


.modal-left {
margin-left: 15px;
margin-right: 15px;
  background: #fff;
  flex: 1.5;
  transition-duration: 0.5s;
  transform: translateY(80px);
  opacity: 0;
}

.modal-button {
  color: #6b5b52;
  font-family: "Nunito", sans-serif;
  font-size: 18px;
  cursor: pointer;
  border: 0;
  outline: 0;
  padding: 10px 40px;
  border-radius: 30px;
  background: rgb(255, 255, 255);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.16);
  transition: 0.3s;
}

.modal-button:hover {
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.8);
}

.modal-right {
  flex: 2;
  font-size: 0;
  transition: 0.3s;
  overflow: hidden;
}

.modal-right img {
  width: 100%;
  height: 100%;
  transform: scale(2);
  object-fit: cover;
  transition-duration: 1.2s;
}

.modal.is-open {
  height: 100%;
 /* From https://css.glass */
background: rgba(206, 218, 240, 0.44);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(11.3px);
-webkit-backdrop-filter: blur(11.3px);
border: 1px solid rgba(206, 218, 240, 0.11);
}

.modal.is-open .modal-button {
  opacity: 0;
}

.modal.is-open .modal-container {
  opacity: 1;
  transition-duration: 0.6s;
  pointer-events: auto;
  transform: translateY(0) scale(1);
}

.modal.is-open .modal-right img {
  transform: scale(1);
}

.modal.is-open .modal-left {
  transform: translateY(0);
  opacity: 1;
  transition-delay: 0.1s;
}

.modal-buttons {
  margin-top:90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.sign-up {
  margin: 60px 0 0;
  font-size: 14px;
  text-align: center;
}

.sign-up a {
  color: #8c7569;
  text-decoration: none;
}





.icon-button {
  outline: 0;
  position: absolute;
  right: 10px;
  top: 12px;
  width: 32px;
  height: 32px;
  border: 0;
  background: 0;
  padding: 0;
  cursor: pointer;
}

.scroll-down {
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #276789;
  font-size: 32px;
  font-weight: 800;
  transform: translate(-50%, -50%);
}

.scroll-down svg {
  margin-top: 16px;
  width: 52px;
  fill: currentColor;
}

.errmsg {
  background-color: lightpink;
  color: firebrick;
  font-weight: bold;
  padding: 0.5rem;

  border-radius: 4px;
}


@media(max-width: 750px) {
  .modal-container {
    width: 90%;
  }
  .modal-right {
    display: none;
  }
}




.inputGroup {
  font-family: 'Segoe UI', sans-serif;
  margin-top:70px;
  margin-bottom: 40px;
    margin-left:20px;
     margin-right:20px;
  width:80%;
  justify-content: flex-start;
  position: relative;
}

.inputGroup input {
  font-size: 100%;
  padding: 0.8em;
  outline: none;
  border: 2px solid rgb(200, 200, 200);
  background-color: transparent;
  border-radius: 10px;
  width: 100%;
}

.inputGroup label {
  font-size: 100%;
  position: absolute;
  left: 0;
 
  padding: 0.8em;
  margin-left: 0.5em;
  pointer-events: none;
  transition: all 0.3s ease;
  color: rgb(100, 100, 100);
}

.inputGroup :is(input:focus, input:valid)~label {
  transform: translateY(-50%) scale(.9);
  margin: 0em;
  margin-left: 1.3em;
  padding: 0.4em;
  background-color: #fff;
}

.inputGroup :is(input:focus, input:valid) {
  border-color: rgb(150, 150, 200);
}






.tooltip-container {
  position: relative;
  z-index: 1000;
}

.tooltip-content {
  position: absolute;
 
  color: rgb(0, 0, 0);
  padding: 14px;
  border-radius: 10px;
  font-size: 18px;
  line-height: 1.5;
 
  background: rgba(255, 255, 255, 0.19);
  backdrop-filter: blur(17px);
  -webkit-backdrop-filter: blur(17px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.5),
    inset 0 -1px 0 rgba(255, 255, 255, 0.1),
    inset 0 0 26px 13px rgba(255, 255, 255, 1.3);
  margin-top: 8px;
  transform: translateY(-10px) scale(0.95);
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  z-index: 1000;
}

.tooltip-content::before {
  content: '';
  position: absolute;
  top: 16px;
  left: 20px;
  width: 12px;
  height: 12px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.8),
    transparent
  );
  transform: rotate(45deg);
  border-radius: 2px;
}

.tooltip-content.show {
  transform: translateY(0) scale(1);
  opacity: 1;
  visibility: visible;
}

.tooltip-content::after {
 
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.8),
    transparent,
    rgba(255, 255, 255, 0.3)
  );
}
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
  transition-duration: 0.3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: white;
}

/* plus sign */
.sign {
  width: 100%;
  transition-duration: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign svg {
  width: 17px;
}

.sign svg path {
  fill: black;
}
/* text */
.text {
  
  right: 0%;
  width: 0%;
  opacity: 0;
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  transition-duration: 0.3s;
}
/* hover effect on button width */
.Btn:hover {
  background-color: black;
  width: 125px;
  border-radius: 40px;
  transition-duration: 0.3s;
}

.Btn:hover .sign {
  width: 30%;
  transition-duration: 0.3s;
  padding-left: 20px;
}

.Btn:hover .sign svg path {
  fill:#91e2e8;
}

/* hover effect button's text */
.Btn:hover .text {
  opacity: 1;
  width: 70%;
  transition-duration: 0.3s;
  padding-right: 10px;
}
/* button click effect*/
.Btn:active {
  transform: translate(2px, 2px);
}

</style>