<template>
  <router-view :key="$route.fullPath"></router-view>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Auth",
});
</script>
