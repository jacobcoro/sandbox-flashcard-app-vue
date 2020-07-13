import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '../store';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

async function redirectIfNotAuth(to: any, from: any, next: any) {
  if (store.getters.authMod.isAuthenticated) {
    next();
  } else {
    next('/login');
  }
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // beforeEnter: redirectIfNotAuth,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

const waitForStorageToBeReady = async (to: any, from: any, next: () => void) => {
  // undocumented bug in vuex-persist with localforage. Hacky fix from issues forum
  await ((store as unknown) as { restored: Promise<unknown> }).restored;
  next();
};
router.beforeEach(waitForStorageToBeReady);

export default router;
