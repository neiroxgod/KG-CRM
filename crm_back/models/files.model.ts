import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Account } from 'src/accounts/accounts.model';
import { User } from 'src/users/users.model';

@Table({ tableName: 'files' })
export class Files extends Model<Files> {
  @ApiProperty({ example: '1', description: 'Идентификатор файла' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => Account)
  accountId: number;

  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => User)
  userId: number;

  @Column({
    type: DataType.STRING,
  })
  caption: string;

  @Column({
    type: DataType.STRING,
  })
  originalName: string;

  @Column({
    type: DataType.STRING,
  })
  fileName: string;

  @Column({
    type: DataType.STRING,
  })
  path: string;

  @Column({
    type: DataType.INTEGER,
  })
  size: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Account)
  account: Account;
}
