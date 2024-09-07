import { auth } from "../../utils/firebaseAdmin";

export default defineEventHandler(async (event) => {
  const userId = event.context.params.id; 

  if (!userId) {
    return {
      statusCode: 400,
      message: "ID do usuário é obrigatório",
    };
  }

  try {
    // Excluir o usuário pelo UID
    await auth.deleteUser(userId);

    return {
      statusCode: 200,
      message: `Usuário com UID ${userId} foi excluído com sucesso`,
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: "Erro ao excluir usuário",
      error: error.message,
    };
  }
});
