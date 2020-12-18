import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";

// Vue Validation
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

// jQuery
global.jQuery = require("jquery");
var $ = global.jQuery;
window.$ = $;

// Boostrap
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.css";

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
