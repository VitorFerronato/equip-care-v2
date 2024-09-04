import { defineStore } from "pinia";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
export const useUserStore = defineStore("user", {
  state: () => ({
    email: null,
    role: null,
    token: null,
  }),

  actions: {
    async login(email, password) {
      const { $auth } = useNuxtApp();

      try {
        const userCredential = await signInWithEmailAndPassword(
          $auth,
          email,
          password
        );

        const user = userCredential.user;
        this.token = user?.accessToken;
        this.email = user?.email;
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },

    async logout() {
      const { $auth } = useNuxtApp();
      await signOut($auth);

      this.token = null;
      this.email = null;
      this.role = null;
    },
  },

  persist: {
    storage: persistedState.localStorage,
  },
});
