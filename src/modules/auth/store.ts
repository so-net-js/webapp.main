import { UserServiceApi } from "@/api/user-api";
import VueRouter from "vue-router";
import { ROUTES } from "./routes";

export interface AuthModuleState {
  username: string | null;
  jwt: string | null;
  loggedIn: boolean;
}

export const LOCAL_STORAGE_KEY_JWT = "sonet-jwt";

export default {
  namespaced: true as true,
  state: {
    username: null,
    jwt: null,
    loggedIn: false,
  } as AuthModuleState,
  getters: {},
  mutations: {
    SET_USERNAME(state: AuthModuleState, username: string) {
      state.username = username;
    },
    SET_JWT(state: AuthModuleState, jwt: string) {
      state.jwt = jwt;
    },
    SET_LOGGED_IN(state: AuthModuleState, value: boolean) {
      state.loggedIn = value;
    },
  },
  actions: {
    async init({ commit }): Promise<boolean> {
      const jwt = localStorage.getItem(LOCAL_STORAGE_KEY_JWT);
      if (!jwt) return false;
      commit("SET_JWT", jwt);
      return true;
    },
    async login(
      { commit },
      payload: {
        username: string;
        password: string;
        errCallback: () => void;
      },
    ) {
      try {
        const res = await UserServiceApi.getUnauthorized().post<{
          username: string;
          jwt: string;
        }>("/login", {
          username: payload.username,
          password: payload.password,
        });
        if (res && res.data) {
          commit("SET_USERNAME", res.data.username);
          commit("SET_JWT", res.data.jwt);
          commit("SET_LOGGED_IN", true);
        }
        // @todo handle error
      } catch (e) {}
    },
    async register(
      { commit },
      payload: {
        username: string;
        password: string;
        router: VueRouter;
        errCallback: () => void;
      },
    ) {
      try {
        const res = await UserServiceApi.getUnauthorized().post<{
          status: boolean;
        }>("/register", {
          username,
          password,
        });
        if (res && res.data && res.data.status) {
          // router.replace(ROUTES.MAIN.$); @todo uncomment this and remove code below
          router.replace("/");
        }
        // @todo handle error
      } catch (e) {}
    },
    async checkJWT() {
      //@todo make a request
    },
  },
};
