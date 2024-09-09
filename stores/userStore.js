import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    currentRoles: [
      {
        text: "Admin",
        value: "Admin",
      },
      {
        text: "Padrão",
        value: "Padrão",
      },
    ],
    userList: [],
    getUsersLoading: false,
    createUserLoading: false,
    editUserLoading: false,
    deleteUserLoading: false,
  }),

  actions: {
    async getUsers() {
      this.getUsersLoading = true;

      try {
        const { data } = await useFetch("/api/users");
        this.userList =
          data?.value?.map((el) => ({
            ...el,
            isEditing: false,
            role: el?.customClaims?.role,
          })) ?? [];
      } catch (error) {
        console.log(error);
        snackbar("Erro ao buscar usuários", "error");
      }

      this.getUsersLoading = false;
    },

    async createUser(formData) {
      this.createUserLoading = true;
      let isValid;

      try {
        await useFetch("/api/users", {
          method: "POST",
          body: formData,
        });

        snackbar("Sucesso ao criar usuário", "success");
        isValid = true;
      } catch (error) {
        console.log(error);
        snackbar("Erro ao criar usuário", "error");
        isValid = false;
      }

      this.createUserLoading = false;
      return isValid;
    },

    async editUser(user) {
      this.editUserLoading = true;

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

        user.isEditing = false;
      } catch (error) {
        console.log(error);
        snackbar("Erro ao editar usuário", "error");
        this.getUsers();
      }

      this.editUserLoading = false;
    },

    async deleteUser(user) {
      this.deleteUserLoading = true;
      let isValid;

      try {
        await useFetch(`/api/users/${user?.uid}`, {
          method: "DELETE",
        });

        this.userList = this.userList.filter((el) => el.uid !== user?.uid);
        snackbar("Sucesso ao excluir usuário", "success");
        isValid = true;
      } catch (error) {
        console.log(error);
        isValid = false;
        snackbar("Erro ao exluir usuário", "error");
      }

      this.deleteUserLoading = false;
      return isValid;
    },
  },
});

// const validateFields = (user) => {
// let emailIsValid = rulesEmail(user.email)
// let userNameIsValid = noNumbersOrSymbols(user.displayName)
// console.log(emailIsValid, userNameIsValid);
// };
