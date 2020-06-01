import { AuthState } from '../types';

const version = 103;
export default {
  namespaced: true as true,
  state: {
    CONTEXT_KEY: 'context',
    IDENTITY_KEY: 'identity-' + version,
    TOKEN_KEY: 'token',
    USER_THREAD_ID: 'user_thread',
    persistenceKey: null,
  } as AuthState,
  getters: {
    // message: state => `Hello, ${state.name}!`,
  },
  mutations: {
    setIdentityKey(state: AuthState, key: string) {
      state.IDENTITY_KEY = key;
    },
    setPersistenceKey(state: AuthState, key: string) {
      state.persistenceKey = key;
    },
  },
  actions: {
    // async loadName({ commit }, payload: { id: string }) {
    //   const name = `Name-${payload.id}`; // load it from somewhere
    //   commit('SET_NAME', name);
    //   return { name };
    // },
  },
};
