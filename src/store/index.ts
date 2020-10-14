import Vue from "vue";
import Vuex from "vuex";
import { createDirectStore } from "direct-vuex";

import auth from "../modules/auth/store";

Vue.use(Vuex);

const { store, rootActionContext, moduleActionContext } = createDirectStore({
  modules: {
    auth,
  },
});

export default store;

export { rootActionContext, moduleActionContext };
export type AppStore = typeof store;
declare module "vuex" {
  interface Store<S> {
    direct: AppStore;
  }
}
