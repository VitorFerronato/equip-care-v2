import admin from "firebase-admin";
import { useRuntimeConfig } from "#imports";

const config = useRuntimeConfig();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(config.firebaseAdmin.serviceAccount)
    ),
  });
}

export const auth = admin.auth();
