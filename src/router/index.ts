import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '../store';
import VanillaCRUD from '../views/VanillaCRUD.vue';
import VuexPersisted from '../views/VuexPersisted.vue';
import CompositionApiVanilla from '../views/CompositionApiVanilla.vue';
import ComposVuexPersist from '../views/ComposVuexPersist.vue';

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
  {
    path: '/CompositionApiVanilla',
    name: 'CompositionApiVanilla',
    component: CompositionApiVanilla,
  },
  {
    path: '/ComposVuexPersist',
    name: 'ComposVuexPersist',
    component: ComposVuexPersist,
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
