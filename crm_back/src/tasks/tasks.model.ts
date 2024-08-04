import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Model,
  DataType,
  Table,
  BelongsToMany,
  HasOne,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Account } from 'src/accounts/accounts.model';
import { Employer } from 'src/employers/employers.model';
import { EmployerRoles } from 'src/roles/employer-roles.model';
import { Role } from 'src/roles/roles.model';
import { User } from 'src/users/users.model';

interface TasksCreatingAttrs {
  text: string;
  employerId: number;
  accountId: number;
  targetUserId: number;
  targetEmployerId: number;
  timedeadline: string;
}

@Table({ tableName: 'tasks' })
export class Tasks extends Model<Tasks, TasksCreatingAttrs> {
  @ApiProperty({ example: '1', description: 'Идентификатор задачи' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'Идентификатор аккаунта' })
  @ForeignKey(() => Account)
  @Column({
    type: DataType.INTEGER,
  })
  accountId: number;

  @ApiProperty({
    example: '1',
    description: 'Идентификатор ответственного сотрудника',
  })
  @ForeignKey(() => Employer)
  @Column({
    type: DataType.INTEGER,
  })
  employerId: number;

  @ApiProperty({ example: '1', description: 'Идентификатор аккаунта' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  targetUserId: number;

  @ApiProperty({ example: '1', description: 'Идентификатор аккаунта' })
  @ForeignKey(() => Employer)
  @Column({
    type: DataType.INTEGER,
  })
  targetEmployerId: number;

  @ApiProperty({ example: 'Провестри встречу', description: 'Текст задачи' })
  @Column({
    type: DataType.STRING,
  })
  text: string;

  @ApiProperty({
    example: 'Провели встречу',
    description: 'Описание закрытой задачи',
  })
  @Column({
    type: DataType.STRING,
  })
  result: string;

  @ApiProperty({
    example: '2024-08-21 12:00:00',
    description: 'Дедлайн',
  })
  @Column({
    type: DataType.DATE,
  })
  timedeadline: string;

  @ApiProperty({
    example: '2024-08-21 15:00:00',
    description: 'Время закрытия задачи',
  })
  @Column({
    type: DataType.DATE,
  })
  timefinish: string;

  @BelongsTo(() => Employer)
  Employer: Employer;

  @BelongsTo(() => Account)
  account: Account;

  @BelongsTo(() => User)
  user: User;
}
