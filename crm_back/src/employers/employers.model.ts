import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Model,
  DataType,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';
import { EmployerRoles } from 'src/roles/employer-roles.model';
import { Role } from 'src/roles/roles.model';

interface EmployerCreatinAttrs {
  username: string;
  email: string;
  password: string;
  phone: string;
  name: string;
  caption?: string;
}

@Table({ tableName: 'Employers' })
export class Employer extends Model<Employer, EmployerCreatinAttrs> {
  @ApiProperty({ example: '1', description: 'Идентификатор сотрудника' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'best_login', description: 'Логин сотрудника' })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  username: string;

  @ApiProperty({
    example: 'bb@mail.ru',
    description: 'Почта',
  })
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Пароль',
  })
  @Column({
    type: DataType.STRING,
  })
  password: string;

  @ApiProperty({
    example: '+79999999999',
    description: 'Телефон',
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({
    example: 'Иванов Иван Иванович',
    description: 'ФИО',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({
    example: 'Тестовая школа',
    description: 'Название учреждения',
  })
  @Column({
    type: DataType.STRING,
  })
  caption: string;

  @BelongsToMany(() => Role, () => EmployerRoles)
  roles: Role[];
}
