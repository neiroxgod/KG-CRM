import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Model,
  DataType,
  Table,
  BelongsToMany,
  ForeignKey,
} from 'sequelize-typescript';
import { Employer } from 'src/employers/employers.model';
import { Role } from './roles.model';

@Table({ tableName: 'employer_roles' })
export class EmployerRoles extends Model<EmployerRoles> {
  @ApiProperty({ example: '1', description: 'Айдишник' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Admin', description: 'Роль пользователя' })
  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
  })
  roleId: number;

  @ApiProperty({
    example: 'Имеет доступ ко всем разделам',
    description: 'Описание роли',
  })
  @ForeignKey(() => Employer)
  @Column({
    type: DataType.INTEGER,
  })
  employerId: number;
}
