<template>
  <b-form>
    <p v-if="state.showSignup" class="mt-3 mb-0">
      Welcome. Thanks for signing up!
    </p>
    <p v-else class="mt-3 mb-0">
      Welcome back! Please sign in.
    </p>
    <span>
      <b-button
        v-if="state.showSignup"
        :disabled="loginButtonDisable"
        type="submit"
        variant="primary"
        @click="$emit('signup')"
      >
        <font-awesome-icon v-show="state.makingRequest" icon="spinner" spin />
        Sign up</b-button
      >
      <b-button
        v-else
        :disabled="loginButtonDisable"
        type="submit"
        variant="primary"
        @click="$emit('login')"
      >
        <font-awesome-icon v-show="state.makingRequest" icon="spinner" spin />
        Log in</b-button
      >

      <b-button
        v-if="state.showSignup"
        class="m-3"
        type="submit"
        variant="secondary"
        @click="state.showSignup = !state.showSignup"
        >Log in</b-button
      >
      <b-button
        v-else
        class="m-3"
        type="submit"
        variant="secondary"
        @click="state.showSignup = !state.showSignup"
        >Sign up</b-button
      >
    </span>
  </b-form>
</template>
<script lang="ts">
import { BForm, BButton } from 'bootstrap-vue';
import { reactive, computed } from '@vue/composition-api';
export default {
  components: { BForm, BButton },
  props: { emailValidation: Boolean, passwordValidation: Boolean, makingRequest: Boolean },
  setup(props) {
    const state = reactive({
      showSignup: false,
    });
    const loginButtonDisable = computed(() => {
      if (!props.emailValidation || !props.passwordValidation || props.makingRequest) {
        return true;
      } else {
        return false;
      }
    });
    return { props, state, loginButtonDisable };
  },
};
</script>

<style></style>
