import { ApiProperty } from '@nestjs/swagger';

export class CreateBrunchDto {
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
