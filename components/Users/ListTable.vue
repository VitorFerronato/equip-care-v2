<template>
  <div>
    <Dsg-Loading-Circular v-if="isLoading" class="my-6" />
    <v-data-table
      v-else
      :headers="headers"
      :items="users"
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

          <Dsg-Text-Field
            v-else
            v-model="item.displayName"
            @keyup.enter="editUser(item)"
            class="mb-1"
          />
        </div>
      </template>

      <template v-slot:[`item.email`]="{ item }">
        <div>
          <div v-if="!item.isEditing">
            {{ item.email }}
          </div>

          <Dsg-Text-Field
            v-else
            v-model="item.email"
            @keyup.enter="editUser(item)"
            class="mb-1"
          />
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

          <Dsg-Combobox
            v-model="item.role"
            :items="permissionItems"
            @keyup.enter="editUser(item)"
            v-else
          />
        </div>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <div
          v-if="!item.isEditing"
          class="d-flex align-center justify-center ga-2"
        >
          <Dsg-Icon-Btn
            :iconName="'mdi-pencil-outline'"
            @click="item.isEditing = true"
          />

          <Users-Delete-Modal :user="item" @updateUserList="updateUserList" />
        </div>

        <div
          v-if="item.isEditing"
          class="d-flex align-center justify-center ga-2"
        >
          <Dsg-Icon-Btn
            :btnColor="'green'"
            :iconName="'mdi-check-outline'"
            @click="editUser(item)"
          />

          <Dsg-Icon-Btn
            :btnColor="'red'"
            :iconName="'mdi-close'"
            @click="item.isEditing = false"
          />
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

let isLoading = ref(false);
const users = ref([{}]);
const getUsers = async () => {
  isLoading.value = true;

  try {
    const { data } = await useFetch("/api/users");

    users.value =
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

  try {
    let request = {
      ...user,
      name: user.displayName,
      type: user?.role?.value ? user.role.value : user.role,
    };

    delete request.customClaims;
    await useFetch(`/api/users/${user.uid}`, {
      method: "PUT",
      body: request,
    });
  } catch (error) {
    console.log(error);
    snackbar("Erro ao editar usuário", "error");
    getUsers();
  }

  user.isEditing = false;
  tableLoading.value = false;
};

const updateUserList = (userId) => {
  if (userId) {
    users.value = users.value.filter((user) => user.uid !== userId);
    snackbar("Usuário excluido com sucesso", "success");
  }
};

onMounted(() => {
  getUsers();
});
</script>