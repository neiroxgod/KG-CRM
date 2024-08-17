import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  Column,
  Model,
  DataType,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { Role } from './roles.model';

@ApiTags('Роли')
@Table({ tableName: 'users_roles' })
export class UserRoles extends Model<UserRoles> {
  @ApiProperty({ example: '1', description: 'Айдишник' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'Айди сущности' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @ApiProperty({ example: '1', description: 'Айди роли' })
  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
  })
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;

  @BelongsTo(() => User)
  user: User;
}
