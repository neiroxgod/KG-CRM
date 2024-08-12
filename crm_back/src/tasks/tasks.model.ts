import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Model,
  DataType,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Account } from 'src/accounts/accounts.model';
import { User } from 'src/users/users.model';

interface TasksCreatingAttrs {
  text: string;
  employerId: number;
  accountId: number;
  targetUserId?: number;
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
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  employerId: number;

  @ApiProperty({ example: '1', description: 'Идентификатор аккаунта' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  targetUserId?: number;

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
    type: DataType.STRING,
  })
  timedeadline: string;

  @ApiProperty({
    example: '2024-08-21 15:00:00',
    description: 'Время закрытия задачи',
  })
  @Column({
    type: DataType.STRING,
  })
  timefinish: string;

  @BelongsTo(() => Account)
  account: Account;

  @BelongsTo(() => User)
  user: User;
}
