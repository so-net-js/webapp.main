<template>
  <router-view></router-view>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "ExampleModule",
  async mounted() {
    // do some initial settings stuff for this module
  }
});
</script>
