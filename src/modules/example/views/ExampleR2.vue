<template>
  <div></div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "ExampleModuleR2",
  async mounted() {
      const id = this.$route.params['id'];
  }
});
</script>
