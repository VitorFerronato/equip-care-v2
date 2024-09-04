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

import { useUserStore } from "~/stores/userStore";
const UserStore = useUserStore();

import { useRouter } from "vue-router";
const router = useRouter();

const logout = async () => {
  await UserStore.logout();
  router.push("/login");
};

logout();
</script>

<style lang="scss" scoped>
a {
  list-style-type: disc;
}
</style>