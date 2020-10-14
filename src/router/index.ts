import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import {
  routes as exampleRoutes,
  ROUTES as exampleConsts,
  ROUTE_PARAMS as exampleParams,
} from "../modules/example/routes";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [...exampleRoutes];

export const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export const ROUTES = {
  ...exampleConsts,
};

export type ROUTES_PARAMS = exampleParams;

export const routeResolver = <T>(route: string, params: T) => {
  const res = route;
  Object.values(params).forEach(([key, value]) => {
    res.replace(new RegExp(`:${key}`), value);
  });
  return res;
};
