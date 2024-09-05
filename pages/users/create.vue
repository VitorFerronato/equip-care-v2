<template>
  <div>
    <p class="text-h4">Criar usuários</p>
    <div class="d-flex justify-end my-6">
      <NuxtLink to="/users">
        <Dsg-Btn :disabled="isLoading" title="Voltar" />
      </NuxtLink>
    </div>

    <Users-Create-Form :isLoading="isLoading" @createUser="createUser" />
  </div>
</template>

<script setup>
useHead({
  title: "EQUIPCARE | CRIAR USUÁRIOS",
});

import { ref } from "vue";

import { useRouter } from "vue-router";
const router = useRouter();

let isLoading = ref(false);
const createUser = async (formData) => {
  isLoading.value = true;

  try {
    await useFetch("/api/users", {
      method: "POST",
      body: formData,
    });

    snackbar("Sucesso ao criar usuário", "success");
    setTimeout(() => {
      router.push("/users");
    }, 1000);
  } catch (error) {
    console.log(error);
    snackbar("Erro ao criar usuário", "error");
  }

  isLoading.value = false;
};
</script>
