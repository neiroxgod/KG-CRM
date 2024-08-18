import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Model,
  DataType,
  Table,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { Account } from 'src/accounts/accounts.model';
import { User } from 'src/users/users.model';
import { UsersTasks } from './users-tasks.model';
import { TaskTypes } from './tasks-types.model';

export interface TasksCreatingAttrs {
  text: string;
  userId: number;
  targetUserId?: number;
  objType?: string;
  accountId: number;
  taskType: number;
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
    description: 'Идентификатор создавшего задачу сотрудника',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @ApiProperty({
    example: '12',
    description: 'ID ученика или сотрудника',
  })
  @Column({
    type: DataType.INTEGER,
  })
  targetUserId: number;

  @ApiProperty({
    example: '1',
    description: 'ID типа задачи',
  })
  @ForeignKey(() => TaskTypes)
  @Column({
    type: DataType.INTEGER,
  })
  taskType: number;

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

  @BelongsTo(() => TaskTypes)
  taskTypeObj: TaskTypes;

  @HasMany(() => UsersTasks)
  usersTasks: UsersTasks[];

  @BelongsTo(() => Account)
  account: Account;

  @BelongsTo(() => User)
  user: User;
}
