import { ApiProperty } from '@nestjs/swagger';
import { Timestamp } from 'rxjs';
import {
  Column,
  Model,
  DataType,
  Table,
  BelongsToMany,
  HasOne,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Account } from 'src/accounts/accounts.model';
import { UserRoles } from 'src/roles/employer-roles.model';
import { Role } from 'src/roles/roles.model';

interface GroupCreatinAttrs {
  accountId?: number;
  filialId?: number;
  caption: string;
  timestart: string;
  timefinish: string;
  language?: string;
  level?: string;
  programmId?: number;
  teacherId: number;
  type: number;
  hourLength: number;
  hourPrice: number;
  monthPrice: number;
}

@Table({ tableName: 'groups' })
export class Group extends Model<Group, GroupCreatinAttrs> {
  @ApiProperty({ example: '22', description: 'Идентификатор группы' })
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

  @ApiProperty({ example: '1', description: 'Идентификатор филиала' })
  @Column({
    type: DataType.INTEGER,
  })
  filialId: number;

  @ApiProperty({ example: 'Группа 14', description: 'Название группы' })
  @Column({
    type: DataType.STRING,
  })
  caption: string;

  @ApiProperty({
    example: '2024-09-01 00:00:00',
    description: 'Дата запуска группы',
  })
  @Column({
    type: DataType.DATE,
  })
  timestart: string;

  @ApiProperty({
    example: '2025-05-31 00:00:00',
    description: 'Дата завершения группы',
  })
  @Column({
    type: DataType.DATE,
  })
  timefinish: string;

  @ApiProperty({
    example: 'en',
    description: 'Язык',
  })
  @Column({
    type: DataType.STRING,
  })
  language: string;

  @ApiProperty({
    example: 'Upper-intermediate [B2]',
    description: 'Уровень владения языком',
  })
  @Column({
    type: DataType.STRING,
  })
  level: string;

  @ApiProperty({
    example: '22',
    description: 'Идентификатор программы обучения',
  })
  @Column({
    type: DataType.INTEGER,
  })
  programmId: number;

  @ApiProperty({
    example: '14',
    description: 'Идентификатор сотрудника',
  })
  @Column({
    type: DataType.INTEGER,
  })
  teacherId: number;

  @ApiProperty({
    example: '1',
    description: 'Тип группы',
  })
  @Column({
    type: DataType.INTEGER,
  })
  type: number;

  @ApiProperty({
    example: '45',
    description: 'Длительность академического часа',
  })
  @Column({
    type: DataType.INTEGER,
  })
  hourLength: number;

  @ApiProperty({
    example: '150',
    description: 'Цена академ.часа',
  })
  @Column({
    type: DataType.INTEGER,
  })
  hourPrice: number;

  @ApiProperty({
    example: '12000',
    description: 'Ежемесячный платеж',
  })
  @Column({
    type: DataType.INTEGER,
  })
  monthPrice: number;

  @BelongsTo(() => Account)
  account: Account;
}
