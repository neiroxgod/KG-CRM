import { getEmployersByAccount } from "~/server/database/employers";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { accountId } = body;

  if (!accountId) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Invalid params",
      })
    );
  }

  // Проверяем есть ли юзер такой ваще
  const employersList = await getEmployersByAccount(accountId);

  return {
    employers: employersList,
  };
});
