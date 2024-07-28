import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, DataType, Table } from 'sequelize-typescript';

interface UserCreationAttrs {
  email: String;
  password: String;
  username: String;
  name?: String;
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
}
