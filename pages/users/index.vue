<template>
  <div>
    <p class="text-h4">Usuários</p>

    <div class="d-flex justify-end my-6">
      <NuxtLink to="/users/create">
        <Dsg-btn :title="'Criar usuário'" />
      </NuxtLink>
    </div>

    <Users-List-Table />
  </div>
</template>

<script setup>
useHead({
  title: "EQUIPCARE | USUÁRIOS",
});

import { ref } from "vue";

const breadCrumbs = ref([
  {
    title: "Usuários",
    disabled: false,
    href: "users",
  },
]);
</script>

<style lang="scss" scoped>
</style>