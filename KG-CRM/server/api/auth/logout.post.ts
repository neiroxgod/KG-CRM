export default defineEventHandler(async (event) => {
  try {
    deleteCookie(event, "refresh_token");
  } catch {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "Something went wrong",
      })
    );
  }
});
