export interface IUser {
  id: string;
  name: string;
  email: string;
  username: string;
  accountId: Number;
  [key: string]: string;
}

export const userTransformer = (user: IUser) => {
  return {
    id: user.id,
    accountId: user.accountId,
    name: user.name,
    email: user.email,
    phone: user.phone,
    username: user.username,
  };
};
