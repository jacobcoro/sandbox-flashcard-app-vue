import Vue from 'vue';
import Vuex, { Payload, Store } from 'vuex';
import { createDirectStore } from 'direct-vuex';
import VuexPersistence from 'vuex-persist';
import Cookies from 'js-cookie';
import localForage from 'localforage';

import { State } from '../types';
import authModule from './authModule';
import decksModule from './decksModule';

import defaultDeck from '@/assets/defaultDeck.json';

// Hacky fix. For some reason when vuex-persist is combined with direct-vuex,
// the store will get overwritten by default values.
const setDefault = function(store: any) {
  console.log(store.state);
  for (const deck of store.state.decksMod.decks) {
    if (deck._id === '123') return null;
  }
  store.commit.decksMod.addDeck(defaultDeck);
  console.log(store.state);
};

// const vuexLocalForage = new VuexPersistence<State>({
//   key: process.env.VUE_APP_STORAGE_KEY,
//   storage: localForage,
//   reducer: state => ({ decksMod: state.decksMod }), // only save decks module
//   // undocumented bug in vuex-persist with localforage. Hacky fix from issues forum
//   asyncStorage: true,
// });
const vuexLocalStorage = new VuexPersistence<State>({
  storage: window.localStorage,
  reducer: state => ({ decksMod: state.decksMod }), // only save decks module
  // filter: mutation => mutation.type == 'addNavItem',
});
const vuexCookie = new VuexPersistence<State>({
  restoreState: (key, storage) => Cookies.getJSON(key),
  saveState: (key, state, storage) =>
    Cookies.set(key, state, {
      expires: 3,
    }) as void,
  modules: ['auth'], //only save user module
  // filter: mutation => mutation.type == 'logIn' || mutation.type == 'logOut',
});

Vue.use(Vuex);

const {
  store,
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext,
} = createDirectStore({
  modules: {
    authMod: authModule,
    decksMod: decksModule,
  },
  plugins: [
    // vuexLocalForage.plugin,
    vuexLocalStorage.plugin,
    vuexCookie.plugin,
  ],
});
//
setDefault(store);
// Export the direct-store instead of the classic Vuex store.
export default store;

// The following exports will be used to enable types in the
// implementation of actions and getters.
export { rootActionContext, moduleActionContext, rootGetterContext, moduleGetterContext };

// The following lines enable types in the injected store '$store'.
export type AppStore = typeof store;
declare module 'vuex' {
  interface Store<S> {
    direct: AppStore;
  }
}
