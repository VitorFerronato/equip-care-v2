<template>
  <div>
    <p class="text-h4">Criar usuários</p>
    <div class="d-flex justify-end my-6">
      <NuxtLink to="/users">
        <Dsg-Btn :disabled="createUserLoading" title="Voltar" />
      </NuxtLink>
    </div>

    <Users-Create-Form
      :isLoading="UserStore.createUserLoading"
      @createUser="UserStore.createUser($event)"
    />
  </div>
</template>

<script setup>
useHead({
  title: "EQUIPCARE | CRIAR USUÁRIOS",
});

import { ref } from "vue";

import { useUserStore } from "~/stores/userStore.js";
const UserStore = useUserStore();
</script>
