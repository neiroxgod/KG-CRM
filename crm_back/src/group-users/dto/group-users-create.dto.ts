import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupUserDto {
  @ApiProperty({ example: '1', description: 'Айди группы' })
  groupId: number;
  @ApiProperty({ example: '1', description: 'Айди ученика' })
  userId: number;
}
