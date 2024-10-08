import { auth } from "../../utils/firebaseAdmin";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const userId = event.context.params.id;

  const { name, email, phone, type } = body;

  if (!userId) {
    return {
      statusCode: 400,
      message: "ID do usuário é obrigatório",
    };
  }

  try {
    const updateData = {};

    if (name) updateData.displayName = name;
    if (email) updateData.email = email;
    if (phone) updateData.phoneNumber = phone;

    const userRecord = await auth.updateUser(userId, updateData);

    if (type) {
      await auth.setCustomUserClaims(userId, { role: type });
    }

    return {
      statusCode: 200,
      message: "Usuário atualizado com sucesso",
      userId: userRecord.uid,
      displayName: userRecord.displayName,
      email: userRecord.email,
      phoneNumber: userRecord.phoneNumber,
      role: type || "unchanged",
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: "Erro ao atualizar o usuário",
      error: error.message,
    };
  }
});
