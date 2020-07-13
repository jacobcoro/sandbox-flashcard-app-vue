import { AuthState, State } from '../types';
import { ActionContext, MutationTree, ActionTree } from 'vuex';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import store from '../store';
import router from '../router';
import { ApiRes, PasswordRes } from '../types';

const version = 103;
export default {
  namespaced: true as true,
  state: {
    jwt: null,
    API_URL: process.env.API_URL,
  } as AuthState,
  getters: {
    isAuthenticated(state: AuthState) {
      const jwt = state.jwt;
      if (!jwt || jwt.split('.').length < 3) {
        return false;
      } else {
        const data = JSON.parse(atob(jwt.split('.')[1]));
        const exp = new Date(data.exp);
        const now = new Date();
        console.log('now, exp', now, exp);
        return (now < exp) as boolean;
      }
    },
  },
  mutations: {
    JWT(state: AuthState, jwt: string) {
      state.jwt = jwt;
    },
  },
  actions: {
    // async callAPI<T>(
    //   {},
    //   payload: {
    //     url: string;
    //     headers: HeadersInit;
    //     method: string;
    //     data: object | null;
    //   }
    // ) {
    //   const options = {
    //     url: payload.url,
    //     headers: payload.headers,
    //     method: payload.method,
    //     data: payload.data,
    //   } as AxiosRequestConfig;
    //   if (payload.data) {
    //     options.data = payload.data;
    //   }
    //   console.log('calling API, options', options);
    //   try {
    //     const response = await axios(options);
    //     return response;
    //   } catch (error) {
    //     return error;
    //   }
    // },
    // async passwordSignup({}, payload: { password: string; username: string }) {
    //   const headers = { 'Content-Type': 'application/json' } as HeadersInit;
    //   const responseData = await store.dispatch.authMod.callAPI({
    //     url: process.env.PASSWORD_SIGNUP_ROUTE,
    //     headers: headers,
    //     method: 'POST',
    //     data: {
    //       username: payload.username,
    //       password: payload.password,
    //     },
    //   });
    //   // if (!responseData.status !== 200) {
    //   //   return responseData.error
    //   // } else {
    //   //   login();
    //   // }
    // },
    // async passwordLogin(
    //   { state }: ActionContext<AuthState, State>,
    //   payload: { password: string; username: string }
    // ) {
    //   const headers = {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Basic ' + btoa(payload.username + ':' + payload.password),
    //   } as HeadersInit;
    //   const options = {
    //     url: state.API_URL + process.env.PASSWORD_LOGIN,
    //     headers: headers,
    //     method: 'POST',
    //     data: {
    //       username: payload.username,
    //       password: payload.password,
    //     },
    //   } as AxiosRequestConfig;
    //   const callAPI = async function(
    //     options: AxiosRequestConfig
    //   ): Promise<AxiosResponse<ApiRes<PasswordRes>>> {
    //     return await axios(options);
    //   };
    //   const responseData = await callAPI(options);
    //   if (responseData.token) {
    //     return responseData.error;
    //   } else {
    //     store.commit.authMod.JWT(responseData.token);
    //     router.push('Home');
    //   }
    // },
  },
};
