<template>
  <section>
    <p ref="errRef" :class="errMsg ? 'errmsg' : 'offscreen'" aria-live="assertive">{{ errMsg }}</p>
    <h1 v-if="success">Success!</h1>
    <p v-if="success">
      <a href="#">Sign In</a>
    </p>
    <form v-else @submit.prevent="handleSubmit">
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

<style>
/* Add your styles here */
</style>