import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({ example: '14', description: 'Айди аккаунта' })
  accountId?: number;
  @ApiProperty({ example: '14', description: 'Айди филиала' })
  filialId?: number;
  @ApiProperty({ example: 'тестовая группа', description: 'Название группы' })
  caption: string;
  @ApiProperty({
    example: '2024-09-01 00:00:00',
    description: 'Дата запуска группы',
  })
  timestart: string;
  @ApiProperty({
    example: '2025-06-01 00:00:00',
    description: 'Дата завершения группы',
  })
  timefinish: string;
  @ApiProperty({ example: 'en', description: 'Язык группы' })
  language?: string;
  @ApiProperty({
    example: 'Upper-intermediate B2',
    description: 'Уровень владения языком',
  })
  level?: string;
  @ApiProperty({ example: '11', description: 'Айди программы' })
  programmId?: number;
  @ApiProperty({ example: '11', description: 'Айди преподавателя/сотрудника' })
  teacherId: number;
  @ApiProperty({ example: '11', description: 'Тип группы' })
  type: number;
  @ApiProperty({ example: '45', description: 'Длительность часа (академ)' })
  hourLength: number;
  @ApiProperty({ example: '150', description: 'Стоимость часа (академ)' })
  hourPrice: number;
  @ApiProperty({ example: '12000', description: 'Ежемесячный платеж' })
  monthPrice: number;
}
