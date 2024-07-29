import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Model,
  DataType,
  Table,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Employer } from 'src/employers/employers.model';
import { Role } from 'src/roles/roles.model';

interface AccountCreatinAttrs {
  email: string;
  caption?: string;
}

@Table({ tableName: 'accounts' })
export class Account extends Model<Account, AccountCreatinAttrs> {
  @ApiProperty({ example: '1', description: 'Идентификатор аккаунта' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'bb@mail.ru',
    description: 'Почта',
  })
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @ApiProperty({
    example: 'Тестовая школа',
    description: 'Название учреждения',
  })
  @Column({
    type: DataType.STRING,
  })
  caption: string;

  @HasMany(() => Employer, {
    foreignKey: 'accountId',
  })
  employers: Employer[];
}
