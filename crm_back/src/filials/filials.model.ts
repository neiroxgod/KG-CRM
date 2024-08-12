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

interface FilialCreationAttrs {
  accountId: number;
  caption: string;
  city?: string;
  address?: string;
  phone?: string;
  timezone?: string;
  active: Boolean;
  contractInfo?: string;
  details?: string;
}

@Table({ tableName: 'groups' })
export class Filial extends Model<Filial, FilialCreationAttrs> {
  @ApiProperty({ example: '22', description: 'Идентификатор филиала' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '11', description: 'Идентификатор аккаунта' })
  @ForeignKey(() => Account)
  @Column({
    type: DataType.INTEGER,
  })
  accountId: number;

  @ApiProperty({ example: 'Филиал одинцово', description: 'Название филиала' })
  @Column({
    type: DataType.STRING,
  })
  caption: string;

  @ApiProperty({ example: 'Воронеж', description: 'город филиала' })
  @Column({
    type: DataType.STRING,
  })
  city: string;

  @ApiProperty({
    example: '+7900554123',
    description: 'Контактный номер администрации филиала',
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({
    example: 'Moscow (+3 UTC)',
    description: 'Контактный номер администрации филиала',
  })
  @Column({
    type: DataType.STRING,
  })
  timezone: string;

  @ApiProperty({ example: 'Грищенко дом 14', description: 'Адрес филиала' })
  @Column({
    type: DataType.STRING,
  })
  address: string;

  @ApiProperty({ example: '1', description: 'Активен ли данный филиал' })
  @Column({
    type: DataType.BOOLEAN,
  })
  active: Boolean;

  @ApiProperty({ example: 'Гора текста)', description: 'Адрес филиала' })
  @Column({
    type: DataType.TEXT,
  })
  contractInfo: string;

  @ApiProperty({ example: 'ИНН, КПП, ОГРН', description: 'Реквизиты' })
  @Column({
    type: DataType.TEXT,
  })
  details: string;

  @BelongsTo(() => Account)
  account: Account;
}
