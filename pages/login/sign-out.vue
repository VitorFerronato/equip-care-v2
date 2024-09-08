<template>
  <div class="w-screen h-screen bg-primary-color-dark">
    <div class="div-center">
      <Dsg-Loading-Circular :color="'#fff'" />
      <p class="text-h5 text-white mt-4">Saindo...</p>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "EQUIPCARE | SIGN OUT",
});
definePageMeta({
  layout: "",
});

import { useAuthenticationStore } from "~/stores/authenticationStore.js";
const AuthenticationStore = useAuthenticationStore();

import { useRouter } from "vue-router";
const router = useRouter();

const logout = async () => {
  await AuthenticationStore.logout();
  router.push("/login");
};

logout();
</script>

<style lang="scss" scoped>
a {
  list-style-type: disc;
}
</style>