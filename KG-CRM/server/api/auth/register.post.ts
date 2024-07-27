import { createUser } from "~/server/database/employers.js";
import { userTransformer } from "~/server/transformers/user";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, email, password, repeatPassword, name, caption, phone } =
    body;

  if (
    !username ||
    !email ||
    !password ||
    !repeatPassword ||
    !name ||
    !phone ||
    !caption
  ) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid paramsa" })
    );
  }

  if (password !== repeatPassword) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Passwords do not match" })
    );
  }

  const userData = { username, email, password, name, caption, phone };

  const employer = await createUser(userData);

  return {
    body: employer,
  };
});
