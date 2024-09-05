<template>
  <div>
    <v-data-table :headers="headers" :items="items" hide-default-footer>
      <template v-slot:[`item.userName`]="{ item }">
        <div class="d-flex align-center justify-center ga-2">
          <v-icon size="25"> mdi-account </v-icon>
          {{ item.userName }}
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
import { ref } from "vue";
const headers = ref([
  {
    title: "Nome",
    value: "userName",
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
const items = ref([
  {
    email: "vitorferronato@gmail.com",
    userName: "Vitor Ferronato",
    role: "admin",
  },
]);
</script>

<style lang="scss" scoped>
</style>