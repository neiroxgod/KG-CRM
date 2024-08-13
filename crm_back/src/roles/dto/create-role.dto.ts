export class CreateRoleDto {
  readonly value: string;
  accountId: number;
  readonly description: string;
  readonly access_rights: string;
}
