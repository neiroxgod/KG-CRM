import { getRefreshTokenByToken } from "~/server/database/refreshTokens";
import { decodeRefreshToken, generateTokens } from "~/server/utils/jwt";
import { getUserById } from "~/server/database/employers";

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const refreshToken = cookies.refresh_token;

  if (!refreshToken) {
    return sendError(
      event,
      createError({
        statusMessage: "refresh token is invalid",
        statusCode: 401,
      })
    );
  }

  const rToken = await getRefreshTokenByToken(refreshToken);

  if (!rToken) {
    return sendError(
      event,
      createError({
        statusMessage: "refresh token is invalid",
        statusCode: 401,
      })
    );
  }

  const token = decodeRefreshToken(refreshToken);

  try {
    const user = await getUserById(token.userId);
    const { accessToken } = generateTokens(user);
    return { access_token: accessToken };
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "Something went wrong",
      })
    );
  }
});
