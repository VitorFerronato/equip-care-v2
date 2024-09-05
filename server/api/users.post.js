import { auth } from "../utils/firebaseAdmin";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { name, email, phone, role, password, confirmPassword } = body;

  if (!name || !email || !password || !confirmPassword || !role) {
    return {
      statusCode: 400,
      message: "Campos obrigatórios estão faltando",
    };
  }

  if (password !== confirmPassword) {
    return {
      statusCode: 400,
      message: "As senhas não coincidem",
    };
  }

  try {
    const userRecord = await auth.createUser({
      email: email,
      password: password,
      displayName: name,
      phoneNumber: phone ? phone : undefined,
    });

    const customClaims = {
      role: role,
    };

    await auth.setCustomUserClaims(userRecord.uid, customClaims);

    return {
      statusCode: 200,
      message: "Usuário criado com sucesso",
      userId: userRecord.uid,
      email: userRecord.email,
      role: role,
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: "Erro ao criar usuário",
      error: error.message,
    };
  }
});
