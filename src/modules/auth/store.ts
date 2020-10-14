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
    async login() {
      //@todo make a request
    },
    async register() {
      //@todo make a request
    },
    async checkJWT() {
      //@todo make a request
    },
  },
};
