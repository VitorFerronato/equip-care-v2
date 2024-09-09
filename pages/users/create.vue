<template>
  <div>
    <p class="text-h4">Criar usuários</p>
    <div class="d-flex justify-end my-6">
      <NuxtLink to="/users">
        <Dsg-Btn :disabled="UserStore.createUserLoading" title="Voltar" />
      </NuxtLink>
    </div>

    <Users-Create-Form
      :isLoading="UserStore.createUserLoading"
      @createUser="createUser"
      ref="createUserForm"
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

import { useRouter } from "vue-router";
const router = useRouter();

const createUserForm = ref(null);
const createUser = async (userForm) => {
  let request = {
    ...userForm,
    phone: formatPhoneNumber(userForm.phone),
    role: userForm?.role?.value,
  };

  let isValid = await UserStore.createUser(request);
  if (isValid) {
    await createUserForm.value.cleanForm();
    setTimeout(() => {
      router.push("/users");
    }, 1500);
  }
};
</script>
