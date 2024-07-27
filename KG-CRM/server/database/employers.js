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

  const filial = await prisma.filial.create({
    data: {
      accountId: account.id,
      address: "По умолчанию",
      caption: "Филиал по умолчанию",
    },
  });

  const employer = await prisma.employer.create({
    data: {
      accountId: account.id,
      name: userData.name,
      phone: userData.phone,
      email: userData.email,
      username: userData.username,
      password: userData.password,
      filialId: filial.id,
    },
  });

  return {
    account,
    employer,
    userData,
  };
};

export const getEmployersByAccount = async (accountId) => {
  return await prisma.employer.findMany({
    where: {
      accountId: parseInt(accountId),
    },
  });
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
