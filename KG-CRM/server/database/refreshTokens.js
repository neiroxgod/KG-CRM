import { prisma } from ".";
export const createRefreshToken = async (refreshToken) => {
  return await prisma.refreshToken.create({
    data: refreshToken,
  });
};

export const getRefreshTokenByToken = (token) => {
  return prisma.refreshToken.findUnique({
    where: {
      token: token,
    },
  });
};
