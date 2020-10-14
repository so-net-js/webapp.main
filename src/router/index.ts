import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import {
  routes as authRoutes,
  ROUTES as AUTH_ROUTES,
  RouteParams as AuthRouteParams,
} from "../modules/auth/routes";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [...authRoutes];

export const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export const ROUTES = {
  ...AUTH_ROUTES,
};

export type RouteParams = AuthRouteParams;

export const routeResolver = <T>(route: string, params: T) => {
  let res = route;
  Object.entries(params).forEach(([key, value]) => {
    res = res.replace(new RegExp(`:${key}`), value);
  });
  return res;
};
