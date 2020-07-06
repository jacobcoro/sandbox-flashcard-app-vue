<template>
  <div>
    <div id="login-body">
      <b-alert
        :show="state.dismissCountDown"
        dismissible
        fade
        variant="warning"
        @dismiss-count-down="countDownChanged"
      >
        {{ state.apiErrorMsg }}
      </b-alert>
      <b-form id="form-signin" @submit.stop.prevent>
        <label for="feedback-email">Email</label>
        <b-form-input
          id="feedback-email"
          v-model="state.email"
          :state="emailValidation"
        ></b-form-input>
        <b-form-invalid-feedback v-if="state.email" :state="emailValidation">{{
          emailValidationErrorMsg
        }}</b-form-invalid-feedback>
        <!-- <b-form-valid-feedback :state="emailValidation">Looks Good.</b-form-valid-feedback> -->

        <label for="feedback-password">Password</label>
        <b-form-input
          id="feedback-password"
          v-model="state.password"
          :state="passwordValidation"
          type="password"
        ></b-form-input>
        <b-form-invalid-feedback v-if="state.password" :state="passwordValidation">{{
          passwordValidationErrorMsg
        }}</b-form-invalid-feedback>
        <!-- <b-form-valid-feedback :state="passwordValidation">Looks Good.</b-form-valid-feedback> -->
        <p v-if="state.showSignup" class="mt-2">
          Welcome. Thanks for signing up!
        </p>
        <p v-else class="mt-2">
          Welcome back! Please sign in.
        </p>
        <span id="login-signup-buttons">
          <b-button
            v-if="state.showSignup"
            :disabled="loginButtonDisable"
            type="submit"
            variant="primary"
            @click="signup(API_URL)"
          >
            <font-awesome-icon v-show="state.makingRequest" icon="spinner" spin />
            Sign up</b-button
          >
          <b-button
            v-else
            :disabled="loginButtonDisable"
            type="submit"
            variant="primary"
            @click="login()"
          >
            <font-awesome-icon v-show="state.makingRequest" icon="spinner" spin />
            Log in</b-button
          >

          <b-button
            v-if="state.showSignup"
            id="sign-up-a"
            type="submit"
            variant="secondary"
            @click="state.showSignup = !state.showSignup"
            >Log in</b-button
          >
          <b-button
            v-else
            id="sign-up-a"
            type="submit"
            variant="secondary"
            @click="state.showSignup = !state.showSignup"
            >Sign up</b-button
          >
        </span>
      </b-form>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, computed, watch } from '@vue/composition-api';
import { BForm, BFormInvalidFeedback, BFormInput, BAlert, BButton } from 'bootstrap-vue';
import store from '../store';
import router from '../router';
import axios, { AxiosRequestConfig } from 'axios';
const API_URL = process.env.API_URL as string;
export default {
  name: 'Login',
  components: { BForm, BFormInvalidFeedback, BFormInput, BAlert, BButton },
  setup() {
    const state = reactive({
      email: '' as string,
      password: '' as string,

      apiErrorMsg: '' as string,
      failedLogin: false as boolean,

      makingRequest: false as boolean,

      showSignup: false as boolean,

      dismissSecs: 5 as number,
      dismissCountDown: 0 as number,
    });

    const emailValidation = computed(() => {
      const email = state.email;
      if (email.length <= 5 || email.length >= 64) {
        return false;
      }
      if (!email.includes('@') || !email.includes('.')) {
        return false;
      } else {
        return true;
      }
    });

    const emailValidationErrorMsg = computed(() => {
      const email = state.email;
      if (email.length <= 5 || email.length >= 64) {
        return 'Email must be 5-64 characters long';
      }
      if (!email.includes('@') || !email.includes('.')) {
        return 'Invalid email';
      } else {
        return null;
      }
    });
    const passwordValidation = computed(() => {
      const password = state.password;
      if (password.length < 8 || password.length >= 64) {
        return false;
      } else {
        return true;
      }
    });
    const passwordValidationErrorMsg = computed(() => {
      const password = state.password;
      if (password.length < 8 || password.length >= 64) {
        return 'Password must be 8-64 characters long';
      } else {
        return null;
      }
    });

    async function showAlert() {
      state.dismissCountDown = state.dismissSecs;
    }
    watch(
      () => state.failedLogin,
      newValue => {
        if (newValue === true) {
          showAlert();
        }
      }
    );

    // const invalidSignup = computed(() => {
    //   if (!emailValidation || !passwordValidation) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });

    // const invalidLogin = computed(() => {
    //   if (!emailValidation || !passwordValidation) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });

    const loginButtonDisable = computed(() => {
      if (!emailValidation || !passwordValidation || state.makingRequest) {
        return true;
      } else {
        return false;
      }
    });

    async function callAPI(
      url: string,
      headers: HeadersInit,
      method: string,
      callback: (data: object) => void,
      data: object
    ) {
      const options = {
        url: url,
        headers: headers,
        method: method,
        data: data,
      } as AxiosRequestConfig;
      if (data !== null) {
        options.data = data;
      }
      // console.log('calling API, options', options);
      await axios(options)
        .then(response => {
          data = response.data;
          if (callback !== null) {
            callback(data);
          }
          return data;
        })
        .catch(function(err) {
          state.failedLogin = true;
          state.apiErrorMsg = err;
        });
    }

    const login = async function() {
      state.makingRequest = true;
      state.failedLogin = false;
      const loginURL = API_URL + '/login';
      const username = state.email;
      const password = state.password;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(username + ':' + password),
      } as HeadersInit;
      const loginCallback = function(data: any) {
        if (!data.token) {
          state.makingRequest = false;
          state.failedLogin = true;
          state.apiErrorMsg = data.error;
        } else {
          store.commit.authMod.JWT(data.token);
          router.push('Home');
        }
        state.makingRequest = false;
      };
      callAPI(loginURL, headers, 'GET', loginCallback, {});
    };

    const signup = async function(API_URL: string) {
      state.makingRequest = true;
      state.failedLogin = false;
      const email = state.email;
      const password = state.password;
      const signupUrl = API_URL + '/sign_up';
      const signUpData = {
        email: email,
        password: password,
      };
      const headers = { 'Content-Type': 'application/json' };
      const signupCallback = function(data: any) {
        if (data.code !== 200) {
          state.makingRequest = false;
          state.failedLogin = true;
          state.apiErrorMsg = data.error;
        } else {
          login();
        }
      };
      callAPI(signupUrl, headers, 'POST', signupCallback, signUpData);
    };

    async function countDownChanged(dismissCountDown: number) {
      state.dismissCountDown = dismissCountDown;
    }

    return {
      state,
      login,
      signup,

      emailValidation,
      emailValidationErrorMsg,
      passwordValidation,
      passwordValidationErrorMsg,
      countDownChanged,
      loginButtonDisable,
    };
  },
};
</script>

<style scoped>
#login-body {
  align-items: center;
  margin: auto;
  max-width: 370px;
  padding: 20px;
  overflow-y: auto;
}
h1 {
  text-align: center;
}
#form-signin {
  max-width: 330px;
}
#sign-up-a {
  margin: 10px;
}
#login-signup-buttons {
  margin-top: 10px;
}
#button-get-pinata {
  margin-top: 10px;
}
label {
  margin-top: 5px;
}
</style>
