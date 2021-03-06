import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import EvaIcons from "vue-eva-icons";
import VueSwal from "vue-swal";

Vue.use(VueSwal);
Vue.use(EvaIcons);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
