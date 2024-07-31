import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  Column,
  Model,
  DataType,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';
import { Employer } from 'src/employers/employers.model';
import { EmployerRoles } from './employer-roles.model';

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
    example: 'Имеет доступ ко всем разделам',
    description: 'Описание роли',
  })
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @BelongsToMany(() => Employer, () => EmployerRoles)
  employers: Employer[];
}
