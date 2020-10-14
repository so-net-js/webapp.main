import { RouteConfig } from "vue-router";
import Example from "./views/Example.vue";
import ExampleR1 from "./views/ExampleR1.vue";
import ExampleR2 from "./views/ExampleR2.vue";

export const ROUTES = {
  EXAMLPE: {
    $: "/example", // for module raw path
    R1: "/example/r1",
    R2_$ID: "/example/r2/:id",
  },
};

export interface ROUTE_PARAMS {
    EXAMPLE: {
        R2_$ID: {
            id: string,
        }
    }
}

export const routes: Array<RouteConfig> = [
  {
    path: ROUTES.EXAMLPE.$,
    component: Example, // consider using lazy load here if module is not neccessary
    children: [
      {
        path: ROUTES.EXAMLPE.R1,
        component: () =>
          import(/* webpackChunkName: "SOME_NAME" */ "./views/ExampleR1.vue"), // for lazy load
      },
      {
        path: ROUTES.EXAMLPE.R2_$ID,
        component: ExampleR2, // for load on time
      },
    ],
  },
];
