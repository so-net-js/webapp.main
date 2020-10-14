<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import { ROUTES, ROUTES_PARAMS, routeResolver } from "@/router";

export default Vue.extend({
  async mounted() {
    store.state.module1.name;
    store.dispatch.module1.loadName({ id: "Hello" });

    this.$router.replace(ROUTES.EXAMLPE.$); // for namespace route
    this.$router.replace(ROUTES.EXAMLPE.R1); // for route without params
    this.$router.replace(
      routeResolver<ROUTES_PARAMS["EXAMPLE"]["R2_$ID"]>(ROUTES.EXAMLPE.R2_$ID, {
        id: "10"
      })
    ); // for route with params;
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
