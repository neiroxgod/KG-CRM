import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  Column,
  Model,
  DataType,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Group } from 'src/groups/groups.model';
import { User } from 'src/users/users.model';

interface GroupUserAttr {
  groupId: number;
  userId: number;
  detachtime: string;
}

@ApiTags('Ученики в группах')
@Table({ tableName: 'groups_users' })
export class GroupUser extends Model<GroupUser, GroupUserAttr> {
  @ApiProperty({ example: '22', description: 'Идентификатор связи' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '11', description: 'Идентификатор группы' })
  @ForeignKey(() => Group)
  @Column({
    type: DataType.INTEGER,
  })
  groupId: number;

  @ApiProperty({ example: '11', description: 'Идентификатор ученика' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @ApiProperty({
    example: '2025-05-31 00:00:00',
    description: 'Дата удаления из группы',
  })
  @Column({
    type: DataType.DATE,
  })
  detachtime: string;

  @BelongsTo(() => Group)
  group: Group;

  @BelongsTo(() => User)
  user: User;
}
