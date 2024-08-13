import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  Column,
  Model,
  DataType,
  Table,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Identity } from 'src/users/identity-model';

interface RoleCreationAttrs {
  value: String;
  description: String;
}

@ApiTags('Роли')
@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Айдишник' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Admin', description: 'Роль пользователя' })
  @Column({
    type: DataType.STRING,
  })
  value: string;

  @ApiProperty({
    example:
      '{group: {payments, users, schedule}}, {employers: {Если пусто имеет доступ ко всему}}, etc... JSON',
    description: 'Какие доступы дает роль',
  })
  @Column({
    type: DataType.TEXT,
  })
  accessRights: string;

  @ApiProperty({
    example: 'Имеет доступ ко всем разделам',
    description: 'Описание роли',
  })
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @HasMany(() => Identity)
  identity: Identity[];
}
