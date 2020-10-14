import { RouteConfig } from "vue-router";
import Auth from "./views/Auth.vue";
import AuthAuthenticate from "./views/AuthAuthenticate.vue";

export const ROUTES = {
  AUTH: {
    $: "/auth",
    AUTHENTICATE_$ACTION: "/auth/:action",
  },
};

export enum AuthenticateActionType {
  LOGIN = "login",
  REGISTER = "register",
}

export interface RouteParams {
  AUTH: {
    AUTHENTICATE_$ACTION: {
      action: AuthenticateActionType;
    };
  };
}

export const routes: Array<RouteConfig> = [
  {
    path: ROUTES.AUTH.$,
    component: Auth,
    children: [
      {
        path: ROUTES.AUTH.AUTHENTICATE_$ACTION,
        component: AuthAuthenticate,
      },
    ],
  },
];
