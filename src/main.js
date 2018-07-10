import Vue from 'vue';
import {
  transitions,
  Vuetify,
  VApp,
  VAvatar,
  VBtn,
  VCard,
  VChip,
  VDataTable,
  VDialog,
  VDivider,
  VGrid,
  VIcon,
  VList,
  VNavigationDrawer,
  VProgressCircular,
  VSelect,
  VToolbar
} from 'vuetify';
import { directives } from 'vuetify/es5/directives';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
