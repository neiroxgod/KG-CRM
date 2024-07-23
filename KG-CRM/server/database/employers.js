import { prisma } from ".";
import bcrypt from "bcrypt";

export const createUser = async (userData) => {
  userData = {
    ...userData,
    password: bcrypt.hashSync(userData.password, 10),
  };

  const account = await prisma.account.create({
    data: {
      caption: userData.caption,
      email: userData.email,
    },
  });

  const employer = await prisma.employer.create({
    data: {
      accountId: account.id,
      name: userData.name,
      username: userData.username,
      password: userData.password,
      email: userData.email,
    },
  });

  return {
    account,
    employer,
    userData,
  };
};

export const getUserByUsername = async (username) => {
  return await prisma.employer.findUnique({
    where: {
      username,
    },
  });
};

export const getUserById = (userId) => {
  return prisma.employer.findUnique({
    where: {
      id: userId,
    },
  });
};
