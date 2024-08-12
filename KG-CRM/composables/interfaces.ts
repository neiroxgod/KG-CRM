export interface IEmployer {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  filialId?: number;
  accountId: number;
  [key: string]: string | number | undefined;
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
