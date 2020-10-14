<template>
  <div class="auth--authenticate layout-full-center">
    <div class="auth--authenticate--inner">
      <h3>{{ formTitle }}</h3>
      <cv-link :to="linkLink">{{ linkText }}</cv-link>

      <div class="auth--authenticate--inner--form">
        <cv-text-input
          label="Username"
          v-model="username"
          :invalid-message="error"
        />
        <cv-button
          class="auth--authenticate--inner--form--button"
          :icon="buttonIcon"
          @click="submitForm"
        >
          {{ buttonText }}
        </cv-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AuthenticateActionType } from "../routes";
import { ROUTES, RouteParams, routeResolver } from "@/router";
import { ArrowRight20 } from "@carbon/icons-vue";

enum AuthStep {
  USERNAME,
  PASSWORD,
  PASSWORD_REPEAT,
}

interface Data {
  buttonIcon: Vue;

  username: string;
  password: string;
  passwordRepeat: string;

  authStep: AuthStep;

  error: string;
}

export default Vue.extend({
  name: "AuthAuthenticate",
  data(): Data {
    return {
      buttonIcon: ArrowRight20,
      username: "",
      password: "",
      passwordRepeat: "",
      authStep: AuthStep.USERNAME,
      error: "",
    };
  },
  computed: {
    action(): AuthenticateActionType {
      return this.$route.params["action"] as AuthenticateActionType;
    },
    formTitle(): string {
      switch (this.action) {
        case AuthenticateActionType.LOGIN:
          return "Sign In";
        case AuthenticateActionType.REGISTER:
          return "Create account";
        default:
          return "";
      }
    },
    linkText(): string {
      switch (this.action) {
        case AuthenticateActionType.LOGIN:
          return "Do not have an account?";
        case AuthenticateActionType.REGISTER:
          return "Already have an account?";
        default:
          return "";
      }
    },
    linkLink(): string {
      return routeResolver<RouteParams["AUTH"]["AUTHENTICATE_$ACTION"]>(
        ROUTES.AUTH.AUTHENTICATE_$ACTION,
        {
          action:
            this.action === AuthenticateActionType.LOGIN
              ? AuthenticateActionType.REGISTER
              : AuthenticateActionType.LOGIN,
        },
      );
    },
    buttonText(): string {
      return "Continue";
    },
  },
  methods: {
    async submitForm() {
      //@todo some login
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@carbon/colors/scss/colors";

.auth--authenticate {
  &--inner {
    width: 300px;
    display: flex;
    flex-direction: column;

    &--form {
      margin-top: 2rem;
      margin-bottom: 2rem;
      padding-top: 2rem;
      padding-bottom: 2rem;
      border-top: 1px solid $gray-80;
      border-bottom: 1px solid $gray-80;
      width: 100%;
      &--button {
        width: 100%;
        margin-top: 1.5rem;
      }
    }
  }
}
</style>
