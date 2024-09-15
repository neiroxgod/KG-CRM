import { ApiProperty } from '@nestjs/swagger';

export class UpdateBrunchDto {
  @ApiProperty({ example: '11', description: 'ID Аудитории' })
  id: number;

  @ApiProperty({ example: '14', description: 'Айди филиала' })
  filialId: number;

  @ApiProperty({ example: 'Филиал 1', description: 'Название аудитории' })
  caption: string;

  @ApiProperty({ example: 'true', description: 'Активна ли аудитории?' })
  active: Boolean;

  @ApiProperty({
    example: '10',
    description: 'Вместимость',
  })
  capacity: number;
}
