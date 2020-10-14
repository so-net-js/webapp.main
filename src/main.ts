import Vue from "vue";
import App from "./App.vue";
import { router } from "./router";
import store from "./store";
import CarbonComponentsVue from "@carbon/vue";

Vue.use(CarbonComponentsVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store: store.original,
  render: h => h(App),
}).$mount("#app");
