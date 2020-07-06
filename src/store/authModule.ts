import { AuthState, State } from '../types';
import { GetterTree, MutationTree } from 'vuex';
const version = 103;
export default {
  namespaced: true as true,
  state: {
    jwt: null,
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
  } as GetterTree<AuthState, State>,
  mutations: {
    JWT(state: AuthState, jwt: string) {
      state.jwt = jwt;
    },
  } as MutationTree<AuthState>,
};
