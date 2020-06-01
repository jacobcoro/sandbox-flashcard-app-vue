import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTrashAlt,
  faPlusSquare,
  faCheck,
  faEdit,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon,
  //  FontAwesomeLayers
} from '@fortawesome/vue-fontawesome';
library.add(faTrashAlt, faPlusSquare, faCheck, faEdit, faTimes);

Vue.component('font-awesome-icon', FontAwesomeIcon);
// Vue.component('font-awesome-layers', FontAwesomeLayers);
Vue.config.productionTip = false;

new Vue({
  router,
  store: store.original,
  render: h => h(App),
}).$mount('#app');
