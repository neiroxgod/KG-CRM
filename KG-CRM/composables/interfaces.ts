export interface IIdentity {
  id: number;
  userId: number;
  roleId: number;
  accountId: number;
  filialId: number;
}
export interface IIdentityWithRelations extends IIdentity {
  roles: IRoles;
  user: IEmployer;
  account: IAccount;
}

export interface IAccount {
  id: number;
  caption: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRoles {
  id: number;
  name: string;
  value: string;
  description: string;
  accessRights: string;
  accountId: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
export interface IEmployer {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  filialId: number;
  accountId: number;
}

export interface IEmployerWithRelations extends IEmployer {
  files: IFiles[];
  tasks: ITasks[];
}

export interface ITags {
  label: string;
  value: string;
}

export interface ITasks {
  text: string;
  employerId: number;
  targetUserId: number;
  targetEmployerId: number;
  timedeadline: string;
  result?: string;
  timefinish?: string;
}

export interface IFiles {
  id: number;
  name: string;
  path: string;
  type: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}
