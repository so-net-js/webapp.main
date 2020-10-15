<template>
  <router-view></router-view>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import { ROUTES, routeResolver, RouteParams } from "@/router/index";
import { AuthenticateActionType } from "./modules/auth/routes";

export default Vue.extend({
  async mounted() {
    const init = await store.dispatch.auth.init();
    if (init) {
      await store.dispatch.auth.checkJWT();
    }

    if (!store.state.auth.loggedIn) {
      this.$router.replace(
        routeResolver<RouteParams["AUTH"]["AUTHENTICATE_$ACTION"]>(
          ROUTES.AUTH.AUTHENTICATE_$ACTION,
          {
            action: AuthenticateActionType.LOGIN,
          },
        ),
      );
    }
  },
});
</script>

<style lang="scss">
@import "./styles/carbon";
@import "./styles/utils";
</style>
