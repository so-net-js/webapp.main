import { UserServiceApi } from "@/api/user-api";
import { RouteParams, routeResolver } from "@/router";
import VueRouter from "vue-router";
import { AuthenticateActionType, ROUTES } from "./routes";

export interface AuthModuleState {
  username: string | null;
  id: string | null;
  jwt: string | null;
  loggedIn: boolean;
}

export const LOCAL_STORAGE_KEY_JWT = "sonet-jwt";

export default {
  namespaced: true as true,
  state: {
    username: null,
    jwt: null,
    id: null,
    loggedIn: false,
  } as AuthModuleState,
  getters: {},
  mutations: {
    SET_ID(state: AuthModuleState, id: string) {
      state.id = id;
    },
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
        router: VueRouter;
      },
    ) {
      try {
        const res = await UserServiceApi.getUnauthorized().post<{
          username: string;
          jwt: string;
          id: string;
        }>("/login", {
          username: payload.username,
          password: payload.password,
        });
        if (res && res.data) {
          commit("SET_ID", res.data.id);
          commit("SET_USERNAME", res.data.username);
          commit("SET_JWT", res.data.jwt);
          commit("SET_LOGGED_IN", true);
          localStorage.setItem(LOCAL_STORAGE_KEY_JWT, res.data.jwt);
        }
        payload.router.replace("/"); //@todo change this to proper path;
      } catch (e) {
        // @todo handle error
      }
    },
    async register(
      _: any,
      payload: {
        username: string;
        password: string;
        router: VueRouter;
      },
    ) {
      try {
        await UserServiceApi.getUnauthorized().post("/register", {
          username: payload.username,
          password: payload.password,
        });
        payload.router.replace(
          routeResolver<RouteParams["AUTH"]["AUTHENTICATE_$ACTION"]>(
            ROUTES.AUTH.AUTHENTICATE_$ACTION,
            { action: AuthenticateActionType.LOGIN },
          ),
        );
        // @todo throw good notification
      } catch (e) {
        // @todo handle error
      }
    },
    async checkJWT({ commit, state }) {
      console.log("ASD", state);
      try {
        console.log(state, state.auth.jwt);
        const res = await UserServiceApi.getUnauthorized().post<{
          username: string;
          id: string;
        }>("/login/jwt", {
          jwt: state.auth.jwt || "",
        });
        if (!res) return;
        commit("SET_USERNAME", res.data.username);
        commit("SET_ID", res.data.id);
        commit("SET_LOGGED_IN", true);
      } catch (e) {
        localStorage.removeItem(LOCAL_STORAGE_KEY_JWT);
        //@todo handle error
      }
    },
  },
};
