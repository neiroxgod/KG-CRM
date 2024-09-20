import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  Column,
  Model,
  DataType,
  Table,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { Tasks } from './tasks.model';
import { Account } from 'src/accounts/accounts.model';

@ApiTags('Типы задач')
@Table({ tableName: 'task_types' })
export class TaskTypes extends Model<TaskTypes> {
  @ApiProperty({ example: '1', description: 'Идентификатор типа' })
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

  @ApiProperty({ example: 'ВАЖНО!', description: 'Название типа задачи' })
  @Column({
    type: DataType.STRING,
  })
  caption: string;

  @ApiProperty({ example: '#ff0000', description: 'Акцентный цвет задачи' })
  @Column({
    type: DataType.STRING,
  })
  accentColor: string;

  @BelongsTo(() => Account)
  account: Account;

  @HasMany(() => Tasks)
  tasks: Tasks[];
}
