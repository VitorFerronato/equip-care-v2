<template>
  <v-card class="pa-4">
    <v-form :disabled="isLoading" @submit.prevent ref="form">
      <v-row>
        <v-col>
          <Dsg-Text-Field
            v-model="formData.name"
            :title="'Nome do usuário*'"
            :rules="[rulesRequired, noNumbersOrSymbols]"
          />
        </v-col>
        <v-col>
          <Dsg-Text-Field
            v-model="formData.email"
            :title="'Email*'"
            :rules="[rulesEmail]"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <Dsg-Text-Field
            v-model="formData.phone"
            :title="'Telefone*'"
            :rules="[rulesRequired]"
            v-mask="'(##) #####-####'"
            hint="(xx) xxxxx-xxxx"
            hide-spin-buttons
          />
        </v-col>
        <v-col>
          <Dsg-Combobox
            v-model="formData.role"
            :title="'Tipo de usuário*'"
            :items="UserStore.currentRoles"
            :rules="[rulesRequired]"
            placeholder="Selecione"
            variant="filled"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col md="6">
          <Dsg-Text-Field
            v-model="formData.password"
            :title="'Senha*'"
            :rules="[rulesRequired, validatePassword]"
            :type="hidePassword ? 'password' : 'text'"
          />
        </v-col>
        <v-col>
          <Dsg-Text-Field
            v-model="formData.confirmPassword"
            :title="'Confirmar senha*'"
            :rules="[
              rulesRequired,
              () => matchPasswords(formData.password, formData.confirmPassword),
            ]"
            :appendIcon="hidePassword ? 'mdi-eye-off-outline' : 'mdi-eye'"
            :type="hidePassword ? 'password' : 'text'"
            @clickAppend="hidePassword = !hidePassword"
          />
        </v-col>
      </v-row>

      <v-row no-gutters align="center" justify="end" class="mt-6">
        <Dsg-Btn
          :disabled="isLoading"
          @click="cancelChanges"
          title="Cancelar"
          variant="outlined"
          class="mr-4"
        />
        <Dsg-Btn
          @click="validateForm"
          :title="'Criar usuário'"
          :disabled="isLoading"
          :loading="isLoading"
          type="submit"
        />
      </v-row>
    </v-form>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

import { useUserStore } from "~/stores/userStore.js";
const UserStore = useUserStore();

const emit = defineEmits(["createUser"]);
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
});
const hidePassword = ref(true);

const form = ref(null);
const formData = ref({
  name: null,
  email: null,
  phone: null,
  role: null,
  password: null,
  confirmPassword: null,
});
const validateForm = async () => {
  if (form.value) {
    const { valid } = await form.value.validate();

    if (valid) emit("createUser", formData.value);
  }
};

const cancelChanges = async () => {
  formData.value = {
    name: null,
    email: null,
    phone: null,
    role: null,
    password: null,
    confirmPassword: null,
  };
};

const cleanForm = () => {
  formData.value = {};
};

defineExpose({
  cleanForm,
});
</script>
