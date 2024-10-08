import { ApiProperty } from '@nestjs/swagger';

export class EditTaskDto {
  @ApiProperty({ example: '1', description: 'ID задачи' })
  id: number;

  @ApiProperty({ example: 'Провести встречу', description: 'текст задачи' })
  text: string;

  @ApiProperty({ example: '45', description: 'ID ответственного сотрудника' })
  responsibleUserId: number;

  @ApiProperty({ example: 'Провести встречу', description: 'Результат задачи' })
  result: string;

  @ApiProperty({ example: '1', description: 'Айди типа задачи' })
  taskType?: number;

  @ApiProperty({
    example: '2024-08-04 12:59:32',
    description: 'Дедлайн задачи',
  })
  timedeadline: string;

  @ApiProperty({
    example: '2024-08-04 12:59:32',
    description: 'Время закрытия задачи',
  })
  timefinish: string;
}
