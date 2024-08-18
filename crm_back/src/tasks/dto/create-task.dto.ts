import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Провести встречу', description: 'текст задачи' })
  text: string;

  @ApiProperty({ example: '45', description: 'Айди аккаунта' })
  accountId: number;

  @ApiProperty({
    example: '11',
    description: 'ID создавшего задачу сотрудника',
  })
  userId: number;

  @ApiProperty({ example: '11', description: 'ID Типа задачи' })
  taskType: number;

  @ApiProperty({
    example: '12',
    description: 'Ответственный сотрудник',
  })
  responsibleUserId?: number;

  @ApiProperty({
    example: 'User',
    description: 'Ответственный сотрудник',
  })
  objType?: string;

  @ApiProperty({
    example: '2024-08-04Z12:59:320T',
    description: 'Цель/Таргет задачи ID user',
  })
  targetUserId?: number;

  @ApiProperty({
    example: '2024-08-04Z12:59:320T',
    description: 'Дедлайн задачи',
  })
  timedeadline: string;
}
