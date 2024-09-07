<template>
  <div>
    <Dsg-Icon-Btn
      :iconName="'mdi-delete-outline'"
      :btnColor="'red'"
      @click="isModalOpen = true"
    />

    <v-dialog
      v-if="isModalOpen"
      v-model="isModalOpen"
      :persistent="isLoading"
      width="600"
    >
      <v-card :disabled="isLoading" class="pa-4">
        <p class="text-h5">Excluir usuário</p>

        <p class="my-4">
          Tem certeza que deseja excluir esse usuário?
          <span class="text-red">Essa ação não poderá ser desfeita!</span>
        </p>
        <div class="d-flex flex-column bg-body-color ga-2 pa-2 mb-4">
          <div class="d-flex align-center ga-1">
            <v-icon size="20" color="#1e3363">mdi-account-outline</v-icon>
            {{ user.displayName }}
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
            :disabled="isLoading"
            @click="isModalOpen = false"
            color="red"
            variant="outlined"
            class="mr-4"
          />
          <Dsg-Btn
            :title="'Excluir'"
            :disabled="isLoading"
            :loading="isLoading"
            @click="deleteUser"
            color="red"
          />
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["updateUserList"]);
const isModalOpen = ref(false);

let isLoading = ref(false);
const deleteUser = async () => {
  isLoading.value = true;

  try {
    await useFetch(`/api/users/${props?.user?.uid}`, {
      method: "DELETE",
    });
    emit("updateUserList", props?.user?.uid ?? null);
  } catch (error) {
    console.log(error);
    snackbar("Erro ao exluir usuário", "error");
  }

  isModalOpen.value = false;
  isLoading.value = false;
};
</script>

<style lang="scss" scoped>
a {
  list-style-type: disc;
}
</style>