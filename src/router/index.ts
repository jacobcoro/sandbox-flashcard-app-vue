import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '../store';
import VanillaCRUD from '../views/VanillaCRUD.vue';
import VuexPersisted from '../views/VuexPersisted.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'VanillaCRUD',
    component: VanillaCRUD,
  },
  {
    path: '/VanillaCRUD',
    name: 'VanillaCRUD',
    component: VanillaCRUD,
  },
  {
    path: '/VuexPersisted',
    name: 'VuexPersisted',
    component: VuexPersisted,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

const waitForStorageToBeReady = async (
  to: any,
  from: any,
  next: () => void
) => {
  // undocumented bug in vuex-persist with localforage. Hacky fix from issues forum
  await ((store as unknown) as { restored: Promise<unknown> }).restored;
  next();
};
router.beforeEach(waitForStorageToBeReady);

export default router;
