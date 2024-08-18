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

@ApiTags('Связывает задачи и юзеров')
@Table({ tableName: 'users_tasks' })
export class UsersTasks extends Model<UsersTasks> {
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
    description: 'Идентификатор (Всегда сотрудник)',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @ApiProperty({
    example: 'Ученик',
    description: 'Тип объекта (Ученик, Сотрудник)',
  })
  @Column({
    type: DataType.STRING,
  })
  objType: string;

  @BelongsTo(() => Tasks)
  task: Tasks;

  @BelongsTo(() => User)
  user: User;
}
