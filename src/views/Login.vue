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
      <login-password
        @updatePassword="state.password = $event"
        @updateEmail="state.email = $event"
        @emailValidation="state.emailValidation = $event"
        @passwordValidation="state.passwordValidation = $event"
      ></login-password>
      <login-signup-buttons
        :email-validation="state.emailValidation"
        :password-validation="state.passwordValidation"
        :making-request="state.makingRequest"
        @login="login()"
        @signup="signup()"
      ></login-signup-buttons>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, watch } from '@vue/composition-api';
import { BAlert } from 'bootstrap-vue';
import LoginPassword from '../components/LoginPassword.vue';
import LoginSignupButtons from '../components/LoginSignupButtons.vue';
import store from '../store';
import router from '../router';
import axios, { AxiosRequestConfig } from 'axios';
const API_URL = process.env.API_URL as string;
export default {
  name: 'Login',
  components: { LoginPassword, LoginSignupButtons, BAlert },
  setup() {
    const state = reactive({
      email: '' as string,
      password: '' as string,
      emailValidation: false as boolean,
      passwordValidation: false as boolean,

      apiErrorMsg: '' as string,
      failedLogin: false as boolean,
      dismissSecs: 5 as number,
      dismissCountDown: 0 as number,

      makingRequest: false as boolean,

      showSignup: false as boolean,
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
        if (data.status !== 200) {
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

      countDownChanged,
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
</style>
