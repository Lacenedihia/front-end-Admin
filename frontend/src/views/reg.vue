<template>
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
        <!-- Error message display -->
        <p ref="errRef" class="errmsg" :class="errMsg ? '' : 'offscreen'" aria-live="assertive">
          {{ errMsg }}
        </p>
        
        <h1 class="modal-title">Register Page</h1>
        <p class="modal-desc"></p>
        
        <div class="input-block">
          <label for="email" class="input-label">Username:
        <FontAwesomeIcon :icon="faCheck" :class="validName ? 'valid' : 'hide'" />
        <FontAwesomeIcon :icon="faTimes" :class="validName || !user ? 'hide' : 'invalid'" />
    </label>
          <input 
            type="text" 
            name="email"   
            id="username"
            placeholder="Username"
             autocomplete="off" 
            ref="userRef"
            v-model="user"
        required
        :aria-invalid="!validName"
        aria-describedby="uidnote"
        @focus="userFocus = true"
        @blur="userFocus = false"/>
        </div>
         <p id="uidnote" :class="userFocus && user && !validName ? 'instructions' : 'offscreen'">
        <FontAwesomeIcon :icon="faInfoCircle" />
        4 to 24 characters.<br />
        Must begin with a letter.<br />
        Letters, numbers, underscores, hyphens allowed.
      </p>
        <div class="input-block">
          <label for="password" class="input-label">  Password:
        <FontAwesomeIcon :icon="faCheck" :class="validPwd ? 'valid' : 'hide'" />
        <FontAwesomeIcon :icon="faTimes" :class="validPwd || !pwd ? 'hide' : 'invalid'" />
    </label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            placeholder="Password"   
            v-model="pwd"
            required
            :aria-invalid="!validPwd"
        aria-describedby="pwdnote"
        @focus="pwdFocus = true"
        @blur="pwdFocus = false"
            />
            <p id="pwdnote" :class="pwdFocus && !validPwd ? 'instructions' : 'offscreen'">
        <FontAwesomeIcon :icon="faInfoCircle" />
        8 to 24 characters.<br />
        Must include uppercase and lowercase letters, a number and a special character.<br />
        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
      </p>
        
    </div>
     <div class="input-block">
       <label for="confirm_pwd" class="input-label">  Confirm Password:
        <FontAwesomeIcon :icon="faCheck" :class="validMatch && matchPwd ? 'valid' : 'hide'" />
        <FontAwesomeIcon :icon="faTimes" :class="validMatch || !matchPwd ? 'hide' : 'invalid'" />
       </label>
          <input 
            type="password" 
            name="password" 
            id="confirm_pwd" 
            placeholder="Password"   
              v-model="matchPwd"
        required
        :aria-invalid="!validMatch"
        aria-describedby="confirmnote"
        @focus="matchFocus = true"
        @blur="matchFocus = false"
            />
      <p id="confirmnote" :class="matchFocus && !validMatch ? 'instructions' : 'offscreen'">
        <FontAwesomeIcon :icon="faInfoCircle" />
        Must match the first password input field.
      </p>

      
    
    
    
    
    </div>
        
        <div class="modal-buttons">
          <router-link to="/login">LogIn Page</router-link>
          <button type="submit" class="input-button" :disabled="!validName || !validPwd || !validMatch">Register</button>
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
    
    <button class="modal-button" type="button" @click="openModal">Click here to Register</button>
  </div>
</div>
</template>
<script>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import axios from '../api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

export default {
    name: 'registerr',
  components: { FontAwesomeIcon },
  setup() {
    const userRef = ref(null);
    const errRef = ref(null);
    const modalRef = ref(null);
    const user = ref('');
    const validName = ref(false);
    const userFocus = ref(false);
    const pwd = ref('');
    const validPwd = ref(false);
    const pwdFocus = ref(false);
    const matchPwd = ref('');
    const validMatch = ref(false);
    const matchFocus = ref(false);
    const errMsg = ref('');
    const success = ref(false);
 const isOpened = ref(false);

    onMounted(() => {
      userRef.value.focus();
      setupModalEvents();
    });
    onUnmounted(() => {
      cleanupModalEvents();
    });
    watch(user, (newValue) => {
      validName.value = USER_REGEX.test(newValue);
    });

    watch([pwd, matchPwd], () => {
      validPwd.value = PWD_REGEX.test(pwd.value);
      validMatch.value = pwd.value === matchPwd.value;
    });

    watch([user, pwd, matchPwd], () => {
      errMsg.value = '';
    });

    const handleSubmit = async () => {
      const v1 = USER_REGEX.test(user.value);
      const v2 = PWD_REGEX.test(pwd.value);
      if (!v1 || !v2) {
        errMsg.value = "Invalid Entry";
        return;
      }
      try {
        const response = await axios.post(REGISTER_URL,
          JSON.stringify({ user: user.value, pwd: pwd.value }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );
        console.log(JSON.stringify(response?.data));
        success.value = true;
        user.value = '';
        pwd.value = '';
        matchPwd.value = '';
      } catch (err) {
        if (!err?.response) {
          errMsg.value = 'No Server Response';
        } else if (err.response?.status === 409) {
          errMsg.value = 'Username Taken';
        } else {
          errMsg.value = 'Registration Failed';
        }
        errRef.value.focus();
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
      // Reset body overflow when component unmounts
      document.body.style.overflow = "initial";
    };

    return {
      userRef,
      errRef,
      user,
      modalRef,
       openModal,
      closeModal,
      validName,
      userFocus,
      pwd,
      validPwd,
      pwdFocus,
      matchPwd,
      validMatch,
      matchFocus,
      errMsg,
      success,
      handleSubmit,
      faCheck,
      faTimes,
      faInfoCircle
    };
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Nunito:400,600,700");

* {
  box-sizing: border-box;
}

body {
  font-family: "Nunito", sans-serif;
  color: rgba(#000, 0.7);
}

.container {
  height: 200vh;
  background-image: url(https://images.unsplash.com/photo-1538137524007-21e48fa42f3f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ac9fa0975bd2ebad7afd906c5a3a15ab&auto=format&fit=crop&w=1834&q=80);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.modal {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: rgba(#333, 0.5);
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
    color: darken(#8c7569, 5%);
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
    background: rgba(#333, 0.85);

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
    color: #8c7569;
  }
}

.input-button {
  padding: 8px 12px;
  outline: none;
  border: 0;
  color: #fff;
  border-radius: 4px;
  background: #8c7569;
  font-family: "Nunito", sans-serif;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background: #55311c;
  }
}

.input-label {
  font-size: 11px;
  text-transform: uppercase;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  letter-spacing: 0.7px;
  color: #8c7569;
  transition: 0.3s;
}

.input-block {
  display: flex;
  flex-direction: column;
  padding: 10px 10px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
  transition: 0.3s;

  input {
    outline: 0;
    border: 0;
    padding: 4px 0 0;
    font-size: 14px;
    font-family: "Nunito", sans-serif;

    &::placeholder {
      color: #ccc;
      opacity: 1;
    }
  }

  &:focus-within {
    border-color: #8c7569;

    .input-label {
      color: rgba(#8c7569, 0.8);
    }
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
  color: darken(#8c7569, 5%);
  font-size: 32px;
  font-weight: 800;
  transform: translate(-50%, -50%);
  svg {
    margin-top: 16px;
    width: 52px;
    fill: currentColor;
  }
}


@media(max-width: 750px) {
  .modal-container {
    width: 90%;
  }
  .modal-right {
    display: none;
  }
}
/* Add your styles here */
* {
  box-sizing: border-box;
}

.container {
  height: 200vh;
  background-image: url(https://images.unsplash.com/photo-1538137524007-21e48fa42f3f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ac9fa0975bd2ebad7afd906c5a3a15ab&auto=format&fit=crop&w=1834&q=80);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.modal {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: rgba(51, 51, 51, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.4s;
}

.modal-container {
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

.modal-title {
  font-size: 26px;
  margin: 0;
  font-weight: 400;
  color: #55311c;
}

.modal-desc {
  margin: 6px 0 30px 0;
}

.modal-left {
  padding: 60px 30px 20px;
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
  background: rgba(51, 51, 51, 0.85);
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-buttons a {
  color: rgba(51, 51, 51, 0.6);
  font-size: 14px;
  text-decoration: none;
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

.input-button {
  padding: 8px 12px;
  outline: none;
  border: 0;
  color: #fff;
  border-radius: 4px;
  background: #8c7569;
  font-family: "Nunito", sans-serif;
  transition: 0.3s;
  cursor: pointer;
}

.input-button:hover {
  background: #55311c;
}

.input-label {
  font-size: 11px;
  text-transform: uppercase;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  letter-spacing: 0.7px;
  color: #8c7569;
  transition: 0.3s;
}

.input-block {
  display: flex;
  flex-direction: column;
  padding: 10px 10px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
  transition: 0.3s;
}

.input-block input {
  outline: 0;
  border: 0;
  padding: 4px 0 0;
  font-size: 14px;
  font-family: "Nunito", sans-serif;
}

.input-block input::placeholder {
  color: #ccc;
  opacity: 1;
}

.input-block:focus-within {
  border-color: #8c7569;
}

.input-block:focus-within .input-label {
  color: rgba(140, 117, 105, 0.8);
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
  color: #6b5b52;
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
  margin-bottom: 0.5rem;
  border-radius: 4px;
}

.offscreen {
  position: absolute;
  left: -9999px;
}

@media(max-width: 750px) {
  .modal-container {
    width: 90%;
  }
  .modal-right {
    display: none;
  }
}
</style>>
