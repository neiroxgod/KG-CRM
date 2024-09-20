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
import { Tasks } from './tasks.model';

@ApiTags('История задачи / userstory')
@Table({ tableName: 'tasks_history' })
export class TasksHistory extends Model<TasksHistory> {
  @ApiProperty({ example: '1', description: 'Идентификатор связи' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'Идентификатор задачи' })
  @ForeignKey(() => Tasks)
  @Column({
    type: DataType.INTEGER,
  })
  taskId: number;

  @ApiProperty({
    example: '1',
    description: 'Идентификатор (Всегда сотрудник) Автор истории/коментария',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @ApiProperty({
    example: 'Не дозвонилась, переношу на след.неделю',
    description: 'текст комментария',
  })
  @Column({
    type: DataType.STRING,
  })
  comment: string;

  @BelongsTo(() => Tasks)
  task: Tasks;

  @BelongsTo(() => User)
  user: User;
}
