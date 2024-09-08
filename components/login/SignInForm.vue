<template>
  <div class="sign-in-form">
    <v-form ref="form" @submit.prevent>
      <Dsg-text-field
        v-model="email"
        :rules="[rulesRequired, rulesEmail]"
        title="Email"
        class="mb-4 text-white"
      />
      <Dsg-text-field
        v-model="password"
        :rules="[rulesRequired]"
        :appendIcon="hidePassword ? 'mdi-eye-off-outline' : 'mdi-eye'"
        :type="hidePassword ? 'password' : 'text'"
        @clickAppend="hidePassword = !hidePassword"
        title="Senha"
        class="text-white"
      />
      <Dsg-btn
        :disabled="isLoading"
        :loading="isLoading"
        @click="validateForm"
        title="Entrar"
        type="submit"
        block
        class="text-uppercase my-6"
      />
    </v-form>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { useAuthenticationStore } from "~/stores/authenticationStore.js";
const AuthenticationStore = useAuthenticationStore();

import { useRouter } from "vue-router";
const router = useRouter();

const hidePassword = ref(true);
let isLoading = ref(false);

const form = ref(null);
const email = ref(null);
const password = ref(null);
const validateForm = async () => {
  if (form.value) {
    isLoading.value = true;
    const { valid } = await form.value.validate();

    if (valid) {
      const isValid = await AuthenticationStore.login(email.value, password.value);
      if (isValid) router.push("/");
      else snackbar("Email ou senha incorreto!", "error");
    }

    isLoading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.sign-in-form {
  width: 450px;
}
</style>