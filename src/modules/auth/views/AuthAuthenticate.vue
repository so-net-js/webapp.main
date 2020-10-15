<template>
  <div class="auth--authenticate layout-full-center">
    <div class="auth--authenticate--inner">
      <h3>
        {{ formTitle }}
        <cv-icon-button
          kind="ghost"
          v-if="authStep !== AuthStep.USERNAME"
          @click="previousStep"
          :icon="arrowLeft"
          label="Go back"
        ></cv-icon-button>
      </h3>
      <cv-link v-if="authStep === AuthStep.USERNAME" :to="linkLink">{{
        linkText
      }}</cv-link>
      <div v-else>{{ infoText }}</div>

      <div class="auth--authenticate--inner--form">
        <cv-text-input
          v-if="authStep === AuthStep.USERNAME"
          label="Username"
          v-model="username"
          @keypress.enter="submitForm"
          autofocus
          :invalid-message="error"
        />
        <cv-text-input
          v-if="authStep === AuthStep.PASSWORD"
          label="Password"
          v-model="password"
          type="password"
          @keypress.enter="submitForm"
          :invalid-message="error"
        />
        <cv-text-input
          v-if="authStep === AuthStep.PASSWORD_REPEAT"
          label="Repeat password"
          v-model="passwordRepeat"
          type="password"
          @keypress.enter="submitForm"
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
import { ArrowRight20, ArrowLeft20 } from "@carbon/icons-vue";
import store from "@/store";

enum AuthStep {
  USERNAME,
  PASSWORD,
  PASSWORD_REPEAT,
}

interface Data {
  AuthStep;
  buttonIcon: Vue;
  arrowLeft: Vue;

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
      AuthStep,
      buttonIcon: ArrowRight20,
      arrowLeft: ArrowLeft20,
      username: "",
      password: "",
      passwordRepeat: "",
      authStep: AuthStep.USERNAME,
      error: "",
    };
  },
  watch: {
    username() {
      this.error = "";
    },
    password() {
      this.error = "";
    },
    passwordRepeat() {
      this.error = "";
    },
    action() {
      this.error = "";
    },
    authStep() {
      this.error = "";
    },
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
      if (
        (this.action === AuthenticateActionType.LOGIN &&
          this.authStep === AuthStep.PASSWORD) ||
        (this.action === AuthenticateActionType.REGISTER &&
          this.authStep === AuthStep.PASSWORD_REPEAT)
      ) {
        return "Submit";
      }
      return "Continue";
    },
    infoText(): string {
      return this.action === AuthenticateActionType.LOGIN
        ? `Signing in as ${this.username}`
        : `Registering as ${this.username}`;
    },
  },
  methods: {
    async submitForm() {
      switch (this.authStep) {
        case AuthStep.USERNAME:
          if (!(await this.validateUsername())) break;
          return this.nextStep();
        case AuthStep.PASSWORD:
          if (!(await this.validatePassword())) break;
          if (this.action === AuthenticateActionType.LOGIN) return this.login();
          return this.nextStep();
        case AuthStep.PASSWORD_REPEAT:
          if (!(await this.validateRepeatPassword())) break;
          return this.register();
      }
    },
    async validateUsername(): Promise<boolean> {
      return true;
    },
    async validatePassword(): Promise<boolean> {
      return true;
    },
    async validateRepeatPassword(): Promise<boolean> {
      return true;
    },
    nextStep() {
      this.authStep =
        this.authStep === AuthStep.USERNAME
          ? AuthStep.PASSWORD
          : AuthStep.PASSWORD_REPEAT;
    },
    previousStep() {
      this.authStep =
        this.authStep === AuthStep.PASSWORD_REPEAT
          ? AuthStep.PASSWORD
          : AuthStep.USERNAME;
    },
    async login() {
      await store.dispatch.auth.login({
        username: this.username,
        password: this.password,
        errCallback: this.onErrorCallback,
      });
    },
    async register() {
      await store.dispatch.auth.register({
        username: this.username,
        password: this.password,
        router: this.$router,
        errCallback: this.onErrorCallback,
      });
    },
    onErrorCallback() {
      // show error
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

    h3 {
      margin-bottom: 0.3rem;
      display: flex;
      align-items: center;
      position: relative;

      .cv-button {
        position: absolute;
        right: calc(100% + 2rem);
        top: 0.02rem;
      }
    }

    &--form {
      margin-top: 2rem;
      margin-bottom: 2rem;
      padding-top: 2rem;
      padding-bottom: 2rem;
      border-top: 1px solid $gray-80;
      border-bottom: 1px solid $gray-80;
      width: 100%;

      .cv-text-input {
        margin-bottom: 1.5rem;
      }

      &--button {
        width: 100%;
      }
    }
  }
}
</style>
