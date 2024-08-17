export interface IIdentity {
  id: number;
  userId: number;
  accountId: number;
  filialId: number;
}
export interface IIdentityWithRelations extends IIdentity {
  user: IUserWithRelations;
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

export interface IRolesWithRelations extends IRoles {
  id: number;
  roleId: number;
  userId: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  role: IRoles;
}
export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  filialId: number;
  accountId: number;
}

export interface IUserWithRelations extends IUser {
  files: IFiles[];
  tasks: ITasks[];
  roles: IRolesWithRelations[];
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

export interface IFilial {
  id: number;
  caption: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  city: string;
  timezone: string;
  phone: string;
  active: Boolean;
  contractInfo: string;
  details: string;
  accountId: number;
  account: IAccount | null;
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
