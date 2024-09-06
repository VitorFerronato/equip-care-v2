<template>
  <div>
    <Dsg-Loading-Circular v-if="isLoading" class="my-6" />
    <v-data-table
      v-else
      :headers="headers"
      :items="items"
      :disabled="tableLoading"
      :loading="tableLoading"
      :items-per-page="1000000"
      no-data-text="Não foram encontrados resultados"
      no-results-text="Não foram encontrados resultados"
      loading-text="Carregando usuários..."
      hide-default-footer
    >
      <template v-slot:[`item.displayName`]="{ item }">
        <div>
          <div
            v-if="!item.isEditing"
            class="d-flex align-center justify-center ga-2"
          >
            <v-icon size="25"> mdi-account </v-icon>
            {{ item.displayName }}
          </div>

          <Dsg-Text-Field v-else v-model="item.displayName" class="mb-1" />
        </div>
      </template>

      <template v-slot:[`item.email`]="{ item }">
        <div>
          <div v-if="!item.isEditing">
            {{ item.email }}
          </div>

          <Dsg-Text-Field v-else v-model="item.email" class="mb-1" />
        </div>
      </template>

      <template v-slot:[`item.role`]="{ item }">
        <div>
          <div
            v-if="!item.isEditing"
            class="d-flex align-center justify-center ga-2"
          >
            <v-icon v-show="item.role == 'admin'" size="25">
              mdi-shield-crown-outline
            </v-icon>
            {{ item.role?.text ? item?.role?.text : item.role }}
          </div>

          <Dsg-Combobox v-model="item.role" :items="permissionItems" v-else />
        </div>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <div
          v-if="!item.isEditing"
          class="d-flex align-center justify-center ga-2"
        >
          <v-icon @click="item.isEditing = true" size="25">
            mdi-pencil-box-outline
          </v-icon>
          <v-icon @click="deleteItem(item)" color="red" size="25">
            mdi-delete-outline
          </v-icon>
        </div>

        <div
          v-if="item.isEditing"
          class="d-flex align-center justify-center ga-2"
        >
          <v-icon @click="item.isEditing = false" color="red" size="25">
            mdi-close-box
          </v-icon>
          <v-icon @click="editUser(item)" color="green" size="25">
            mdi-checkbox-marked
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
const permissionItems = ref([
  {
    text: "Admin",
    value: "admin",
  },
  {
    text: "Gerente",
    value: "manager",
  },
  {
    text: "Coordenador",
    value: "coordinator",
  },
]);

let isLoading = ref(true);
const items = ref([{}]);
const getUsers = async () => {
  isLoading.value = true;

  try {
    const { data } = await useFetch("/api/users");
    items.value =
      data?.value?.map((el) => ({
        ...el,
        isEditing: false,
        role: el?.customClaims?.role,
      })) ?? [];
  } catch (error) {
    console.log(error);
    snackbar("Erro ao buscar usuários", "error");
  }

  isLoading.value = false;
};

let tableLoading = ref(false);
const editUser = async (user) => {
  tableLoading.value = true;
  let request = {
    ...user,
    name: user.displayName,
    type: user?.role?.value ? user.role.value : user.role,
  };

  delete request.customClaims;
  const { data } = await useFetch(`/api/users/${user.uid}`, {
    method: "PUT",
    body: user,
  });
  console.log(data.value);
  user.isEditing = false;
  tableLoading.value = false;
};

onMounted(() => {
  getUsers();
});
</script>

<style lang="scss" scoped>
</style>