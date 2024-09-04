import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) => {
  // const { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } = useRuntimeConfig().public

  const firebaseConfig = {
  
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  return {
    provide: {
      auth,
    },
  };
});
