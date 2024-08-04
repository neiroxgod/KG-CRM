import { ApiProperty } from '@nestjs/swagger';

export class EditTaskDto {
  @ApiProperty({ example: '1', description: 'ID задачи' })
  id: number;

  @ApiProperty({ example: 'Провести встречу', description: 'текст задачи' })
  text: string;

  @ApiProperty({ example: '11', description: 'ID ответственного сотрудника' })
  employerId: number;

  @ApiProperty({ example: 'Провести встречу', description: 'Результат задачи' })
  result: string;

  @ApiProperty({
    example: '2024-08-04 12:59:32',
    description: 'Дедлайн задачи',
  })
  deadline: string;

  @ApiProperty({
    example: '2024-08-04 12:59:32',
    description: 'Время закрытия задачи',
  })
  timefinish: string;
}
