import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  Column,
  Model,
  DataType,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';
import { UserRoles } from './employer-roles.model';
import { User } from 'src/users/users.model';

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
    example: 'groups, payments, etc...',
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

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
