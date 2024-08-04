import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Провести встречу', description: 'текст задачи' })
  text: string;

  @ApiProperty({ example: '45', description: 'Айди аккаунта' })
  accountId: number;

  @ApiProperty({ example: '11', description: 'ID ответственного сотрудника' })
  employerId: number;

  @ApiProperty({ example: '411135', description: 'На кого задача (Ученик)' })
  targetUserId?: number;

  @ApiProperty({ example: '411135', description: 'На кого задача (Сотрудник)' })
  targetEmployerId?: number;

  @ApiProperty({
    example: '2024-08-04 12:59:32',
    description: 'Дедлайн задачи',
  })
  deadline: string;
}
