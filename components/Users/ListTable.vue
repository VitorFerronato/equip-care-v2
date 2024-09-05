<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :disabled="isLoading"
      :loading="isLoading"
      :items-per-page="1000000"
      no-data-text="Não foram encontrados resultados"
      no-results-text="Não foram encontrados resultados"
      loading-text="Carregando usuários..."
      hide-default-footer
    >
      <template v-slot:[`item.displayName`]="{ item }">
        <div class="d-flex align-center justify-center ga-2">
          <v-icon size="25"> mdi-account </v-icon>
          {{ item.displayName }}
        </div>
      </template>
      <template v-slot:[`item.role`]="{ item }">
        <div class="d-flex align-center justify-center ga-2">
          <v-icon size="25"> mdi-shield-crown-outline </v-icon>
          {{ item.role }}
        </div>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex align-center justify-center ga-2">
          <v-icon @click="editItem(item)" size="25">
            mdi-pencil-box-outline
          </v-icon>
          <v-icon @click="deleteItem(item)" color="red" size="25">
            mdi-delete-outline
          </v-icon>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const headers = ref([
  {
    title: "Nome",
    value: "displayName",
    align: "center",
  },
  {
    title: "Email",
    value: "email",
    align: "center",
  },

  {
    title: "Nível",
    value: "role",
    align: "center",
  },
  {
    title: "Ações",
    value: "actions",
    align: "center",
  },
]);

let isLoading = ref(false);
const items = ref([{}]);
const getUsers = async () => {
  isLoading.value = true;

  try {
    const { data } = await useFetch("/api/users");
    items.value =
      data?.value?.map((el) => ({
        ...el,
        role: el?.customClaims?.role,
      })) ?? [];
  } catch (error) {
    console.log(error);
    snackbar("Erro ao buscar usuários", "error");
  }

  isLoading.value = false;
};

onMounted(() => {
  getUsers();
});
</script>

<style lang="scss" scoped>
</style>