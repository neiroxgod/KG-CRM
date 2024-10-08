import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Model,
  DataType,
  Table,
  BelongsTo,
  ForeignKey,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { Account } from 'src/accounts/accounts.model';
import { Identity } from './identity-model';
import { Files } from 'src/files/files.model';
import { Tasks } from 'src/tasks/tasks.model';
import { UserRoles } from 'src/roles/users-roles.model';
import { TasksHistory } from 'src/tasks/task-history.model';

interface UserCreationAttrs {
  email: string;
  password: string;
  username: string;
  name?: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Айдишник' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '3', description: 'Айдишник аккаунта связанного' })
  @ForeignKey(() => Account)
  @Column({
    type: DataType.INTEGER,
  })
  accountId: number;

  @ApiProperty({ example: '12', description: 'Айдишник филиала связанного' })
  @Column({
    type: DataType.INTEGER,
  })
  filialId: number;

  @ApiProperty({
    example: 'test@example.ru',
    description: 'Почта пользователя',
  })
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @ApiProperty({
    example: '+79999999999',
    description: 'Телефон',
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({ example: 'qwerty', description: 'Пароль пользователя' })
  @Column({
    type: DataType.STRING,
  })
  password: string;

  @ApiProperty({ example: 'best_login', description: 'Логин пользователя' })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  username: string;

  @ApiProperty({
    example: 'Иванов Иван Иванович',
    description: 'ФИО пользователя',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @HasMany(() => Tasks)
  tasks: Tasks[];

  @HasMany(() => TasksHistory)
  tasksHistory: TasksHistory[];

  @HasMany(() => Files)
  files: Files[];

  @HasMany(() => UserRoles)
  roles: UserRoles[];

  @HasOne(() => Identity)
  identity: Identity;

  @BelongsTo(() => Account)
  account: Account;
}
