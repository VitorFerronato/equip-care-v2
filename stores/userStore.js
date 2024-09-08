import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userList: [],
    getUsersLoading: false,
    createUserLoading: false,
    editUserLoading: false,
    deleteUserLoading: false,
    deleteModal: false,
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

      try {
        await useFetch("/api/users", {
          method: "POST",
          body: formData,
        });

        snackbar("Sucesso ao criar usuário", "success");
      } catch (error) {
        console.log(error);
        snackbar("Erro ao criar usuário", "error");
      }

      this.createUserLoading = false;
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

      try {
        await useFetch(`/api/users/${user?.uid}`, {
          method: "DELETE",
        });

        this.removeUserById(user?.uid);
      } catch (error) {
        console.log(error);
        snackbar("Erro ao exluir usuário", "error");
      }

      this.deleteUserLoading = false;
      this.deleteModal = false;
    },

    removeUserById(userID) {
      this.users = this.users.filter((user) => user.uid !== userID);
      snackbar("Usuário excluido com sucesso", "success");
    },
  },
});
