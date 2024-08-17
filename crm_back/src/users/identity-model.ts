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
import { User } from './users.model';
import { Filial } from 'src/filials/filials.model';

interface IdentityCreationAttrs {
  userId: number;
  accountId: number;
  filialId: number;
}

@Table({ tableName: 'identity' })
export class Identity extends Model<Identity, IdentityCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Айдишник' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'ID пользователя' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @ApiProperty({ example: '1', description: 'ID Аккаунта' })
  @ForeignKey(() => Account)
  @Column({
    type: DataType.INTEGER,
  })
  accountId: number;

  @ApiProperty({ example: '1', description: 'ID Филиала' })
  @ForeignKey(() => Filial)
  @Column({
    type: DataType.INTEGER,
  })
  filialId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Account)
  account: Account;
}
