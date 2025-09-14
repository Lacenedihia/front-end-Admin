<template>

  <section>
    <p ref="errRef" :class="errMsg ? 'errmsg' : 'offscreen'" aria-live="assertive">{{ errMsg }}</p>
   
  
    <form  @submit.prevent="handleSubmit">
      <label for="username">
        Username:
        <FontAwesomeIcon :icon="faCheck" :class="validName ? 'valid' : 'hide'" />
        <FontAwesomeIcon :icon="faTimes" :class="validName || !user ? 'hide' : 'invalid'" />
      </label>
      <input
        type="text"
        id="username"
        ref="userRef"
        autocomplete="off"
        v-model="user"
        required
        :aria-invalid="!validName"
        aria-describedby="uidnote"
        @focus="userFocus = true"
        @blur="userFocus = false"
      />
      <p id="uidnote" :class="userFocus && user && !validName ? 'instructions' : 'offscreen'">
        <FontAwesomeIcon :icon="faInfoCircle" />
        4 to 24 characters.<br />
        Must begin with a letter.<br />
        Letters, numbers, underscores, hyphens allowed.
      </p>

      <label for="password">
        Password:
        <FontAwesomeIcon :icon="faCheck" :class="validPwd ? 'valid' : 'hide'" />
        <FontAwesomeIcon :icon="faTimes" :class="validPwd || !pwd ? 'hide' : 'invalid'" />
      </label>
      <input
        type="password"
        id="password"
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

      <label for="confirm_pwd">
        Confirm Password:
        <FontAwesomeIcon :icon="faCheck" :class="validMatch && matchPwd ? 'valid' : 'hide'" />
        <FontAwesomeIcon :icon="faTimes" :class="validMatch || !matchPwd ? 'hide' : 'invalid'" />
      </label>
      <input
        type="password"
        id="confirm_pwd"
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

      <button :disabled="!validName || !validPwd || !validMatch">Sign Up</button>
    </form>
    <p>
      Already registered?<br />
      <span class="line">
        <router-link to="/">Sign In</router-link>
      </span>
    </p>
  </section>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import axios from '../api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

export default {
  name:'register',
  components: { FontAwesomeIcon },
  setup() {
    const userRef = ref(null);
    const errRef = ref(null);
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

    onMounted(() => {
      userRef.value.focus();
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

    return {
      userRef,
      errRef,
      user,
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

<style scoped >
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
</style>