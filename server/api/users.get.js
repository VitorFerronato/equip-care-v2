import { auth } from "../utils/firebaseAdmin";

export default defineEventHandler(async (event) => {
  try {
    const listUsersResult = await auth.listUsers(1000);
    const users = listUsersResult.users;

    const usersWithClaims = await Promise.all(
      users.map(async (user) => {
        const userRecord = await auth.getUser(user.uid);
        return {
          uid: userRecord.uid,
          email: userRecord.email,
          displayName: userRecord.displayName,
          photoURL: userRecord.photoURL,
          phoneNumber: userRecord.phoneNumber,
          disabled: userRecord.disabled,
          createdAt: userRecord.metadata.creationTime,
          customClaims: userRecord.customClaims || {},
        };
      })
    );

    return usersWithClaims;
  } catch (error) {
    return {
      statusCode: 500,
      message: "Erro ao buscar usuários",
      error: error.message,
    };
  }
});
