import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './store';
import Vuex from 'vuex';

// jQuery
import $ from 'jquery';
global.jQuery = $;
window.$ = $;

// Boostrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// VeeValidate
import {
  configure,
  extend,
  localize,
  ValidationObserver,
  ValidationProvider
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import vi from 'vee-validate/dist/locale/vi.json';
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});
localize('vi', vi);
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);
Vue.component('font-awesome-icon', FontAwesomeIcon);

//
import 'sweetalert2/src/sweetalert2.scss';

Vue.config.productionTip = false;

Vue.use(Vuex);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
