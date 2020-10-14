import Vue from "vue";
import Vuex from "vuex";
import { createDirectStore } from "direct-vuex";
import module1 from "../modules/test/store";

Vue.use(Vuex);

const { store, rootActionContext, moduleActionContext } = createDirectStore({
  modules: {
    module1
  }
});

export default store;

export { rootActionContext, moduleActionContext };
export type AppStore = typeof store;
declare module "vuex" {
  interface Store<S> {
    direct: AppStore
  }
}