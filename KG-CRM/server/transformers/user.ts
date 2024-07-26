export interface IUser {
  id: string;
  name: string;
  email: string;
  username: string;
  [key: string]: string;
}

export const userTransformer = (user: IUser) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
  };
};
