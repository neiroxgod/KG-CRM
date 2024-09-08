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
  id?: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  filialId?: number;
  accountId?: number;
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

// taskTypes interface
export interface ITaskTypes {
  id: number;
  accountId: number;
  caption: string;
  accentColor: string;
}

export interface ITaskTypesWithRelations extends ITaskTypes {
  tasks: ITasksWithRelations[];
}

export interface ITasks {
  id?: number;
  text: string;
  responsibleUserId?: number;
  targetUserId: number;
  objType?: string;
  taskType?: number;
  timedeadline: string;
  result?: string;
  timefinish?: string;
}

export interface IUsersTasks {
  userId: number;
  taskId: number;
  objType: string;
}

export interface IUsersTasksWithRelations extends IUsersTasks {
  user: IUser;
}

export interface ITasksWithRelations extends ITasks {
  taskTypeObj?: ITaskTypes;
  usersTasks: IUsersTasksWithRelations[];
  user: IUser;
  taskHistory: ITasksHistory[];
}

export interface ITasksHistory {
  id?: number;
  comment: string;
  userId: number;
  taskId: number;
  createdAt?: string;
  updatedAt?: string;
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
