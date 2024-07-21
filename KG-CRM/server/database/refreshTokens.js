import { prisma } from ".";
export const createRefreshToken = async (refreshToken) => {
  return await prisma.refreshToken.create({
    data: refreshToken,
  });
};
