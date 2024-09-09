<template>
  <div>
    <Dsg-Loading-Circular v-if="UserStore.getUsersLoading" class="my-6" />
    <v-data-table
      v-else
      :headers="headers"
      :items="UserStore.userList"
      :disabled="UserStore.editUserLoading"
      :loading="UserStore.editUserLoading"
      :items-per-page="1000000"
      no-data-text="Não foram encontrados resultados"
      no-results-text="Não foram encontrados resultados"
      hide-default-footer
    >
      <template v-slot:[`item.displayName`]="{ item }">
        <div>
          <div
            v-if="!item.isEditing"
            class="d-flex align-center justify-center ga-2"
          >
            {{ item.displayName }}
          </div>

          <Dsg-Text-Field
            v-else
            v-model="item.displayName"
            :rules="[rulesRequired, noNumbersOrSymbols]"
            @keyup.enter="UserStore.editUser(item)"
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
            :rules="[rulesRequired, rulesEmail]"
            @keyup.enter="UserStore.editUser(item)"
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
            {{ item.role?.text ? item?.role?.text : item.role }}
          </div>

          <Dsg-Combobox
            v-model="item.role"
            :items="UserStore.currentRoles"
            :rules="[rulesRequired]"
            @keyup.enter="UserStore.editUser(item)"
            v-else
          />
        </div>
      </template>

      <!-- ACTIONS -->
      <template v-slot:[`item.actions`]="{ item }">
        <div
          v-if="!item.isEditing"
          class="d-flex align-center justify-center ga-2"
        >
          <Dsg-Icon-Btn
            :iconName="'mdi-pencil-outline'"
            @click="startEditUser(item)"
          />

          <Users-Delete-Modal :user="item" />
        </div>

        <div
          v-if="item.isEditing"
          class="d-flex align-center justify-center ga-2"
        >
          <Dsg-Icon-Btn
            :btnColor="'green'"
            :iconName="'mdi-check-outline'"
            :class="{
              noEvents:
                item.displayName == '' || item.email == '' || item.role == '',
            }"
            :disabled="disabledActionButton(item)"
            @click="UserStore.editUser(item)"
          />

          <Dsg-Icon-Btn
            :btnColor="'red'"
            :iconName="'mdi-close'"
            @click="cancelEditing(item)"
          />
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { useUserStore } from "~/stores/userStore.js";
const UserStore = useUserStore();

const headers = ref([
  {
    title: "Nome",
    value: "displayName",
    align: "center",
    width: "30%",
  },
  {
    title: "Email",
    value: "email",
    align: "center",
    width: "30%",
  },

  {
    title: "Nível",
    value: "role",
    align: "center",
    width: "25%",
  },
  {
    title: "Ações",
    value: "actions",
    align: "center",
    width: "15%",
  },
]);

const disabledActionButton = (user) => {
  if (user.displayName == "" || user.email == "" || !user.role) return true;

  let emailIsValid = rulesEmail(user.email);
  let nameIsValid = noNumbersOrSymbols(user.displayName);

  if (
    emailIsValid == "Email inválido" ||
    nameIsValid == "O nome não pode conter números ou símbolos"
  )
    return true;

  return false;
};

const userCopy = ref({});
const startEditUser = (user) => {
  UserStore.userList.forEach((el) => {
    el.isEditing = false;
  });

  userCopy.value = { ...user };

  user.isEditing = true;
};
const cancelEditing = (user) => {
  const index = UserStore.userList.findIndex((el) => el.uid === user.uid);

  if (index !== -1) {
    Object.assign(UserStore.userList[index], userCopy.value);

    userCopy.value = {};
    user.isEditing = false;
  }
};

onMounted(() => {
  UserStore.getUsers();
});
</script>

<style lang="scss" scoped>
.noEvents {
  pointer-events: none;
}
</style>
