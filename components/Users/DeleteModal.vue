<template>
  <div>
    <Dsg-Icon-Btn
      :iconName="'mdi-delete-outline'"
      :btnColor="'red'"
      @click="UserStore.deleteModal = true"
    />
    <v-dialog
      v-if="UserStore.deleteModal"
      v-model="UserStore.deleteModal"
      :persistent="UserStore.deleteUserLoading"
      width="600"
    >
      <v-card :disabled="UserStore.deleteUserLoading" class="pa-4">
        <p class="text-h5">Excluir usuário</p>

        <p class="my-4">
          Tem certeza que deseja excluir esse usuário?
          <span class="text-red">Essa ação não poderá ser desfeita!</span>
        </p>
        <div class="d-flex flex-column bg-body-color ga-2 pa-2 mb-4">
          <div class="d-flex align-center ga-1">
            <v-icon size="20" color="#1e3363">mdi-account-outline</v-icon>
            {{ user }}
          </div>
          <div class="d-flex align-center ga-1">
            <v-icon size="20" color="red">mdi-email-outline</v-icon>
            {{ user.email }}
          </div>
          <div class="d-flex align-center ga-1">
            <v-icon size="20" color="#daa520">mdi-shield-outline</v-icon>
            {{ user.role }}
          </div>
        </div>

        <div class="d-flex align-center justify-end">
          <Dsg-Btn
            :title="'Cancelar'"
            :disabled="UserStore.deleteUserLoading"
            @click="UserStore.deleteModal = false"
            color="red"
            variant="outlined"
            class="mr-4"
          />
          <Dsg-Btn
            :title="'Excluir'"
            :disabled="UserStore.deleteUserLoading"
            :loading="UserStore.deleteUserLoading"
            @click="closeModal"
            color="red"
          />
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { useUserStore } from "~/stores/userStore.js";
const UserStore = useUserStore();

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
a {
  list-style-type: disc;
}
</style>