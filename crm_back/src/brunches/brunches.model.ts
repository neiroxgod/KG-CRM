import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Model,
  DataType,
  Table,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { Account } from 'src/accounts/accounts.model';
import { Filial } from 'src/filials/filials.model';
import { Group } from 'src/groups/groups.model';

interface BrunchCreationnAttrs {
  filialId: number;
  active: boolean;
  caption: string;
  capacity: number;
}

@Table({ tableName: 'brunches' })
export class Brunch extends Model<Brunch, BrunchCreationnAttrs> {
  @ApiProperty({ example: '22', description: 'Идентификатор аудитории' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '11', description: 'Идентификатор филиала' })
  @ForeignKey(() => Filial)
  @Column({
    type: DataType.INTEGER,
  })
  filialId: number;

  @ApiProperty({
    example: 'Аудитория Manchester',
    description: 'Название аудитории',
  })
  @Column({
    type: DataType.STRING,
  })
  caption: string;

  @ApiProperty({ example: '10', description: 'Вместимость аудитории' })
  @Column({
    type: DataType.INTEGER,
  })
  capacity: number;

  @ApiProperty({ example: 'true', description: 'Активна ли аудитория' })
  @Column({
    type: DataType.BOOLEAN,
  })
  active: boolean;

  @BelongsTo(() => Filial)
  filial: Filial;

  @HasMany(() => Group)
  groups: Group[];
}
