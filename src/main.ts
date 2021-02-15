import Vue from 'vue';
import router from './router';
import store from './store';
import AppLayout from './layout/index.vue';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(AppLayout),
}).$mount('#app');
