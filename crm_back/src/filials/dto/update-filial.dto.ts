import { ApiProperty } from '@nestjs/swagger';

export class UpdateFilialDto {
  @ApiProperty({ example: '11', description: 'ID филиала' })
  id: number;

  @ApiProperty({ example: 'Филиал 1', description: 'Название филиала' })
  caption: string;

  @ApiProperty({ example: 'Москва', description: 'Название города' })
  city?: string;

  @ApiProperty({
    example: 'Ул.пушкина дом колотушкина',
    description: 'Адрес филиала',
  })
  address?: string;

  @ApiProperty({
    example: '+7902869241',
    description: 'Контактный номер филиала',
  })
  phone?: string;

  @ApiProperty({
    example: 'Russia/Moscow +3 UTC',
    description: 'Часовой пояс / Timezone',
  })
  timezone?: string;

  @ApiProperty({ example: 'true', description: 'Активен ли филиал?' })
  active: Boolean;

  @ApiProperty({
    example: 'https://google.com/search',
    description: 'Ссылка на договор-оферты',
  })
  contractInfo?: string;

  @ApiProperty({
    example: 'КПП 313234555 ИНН 1023185189534891 ОГРНП 3151674 1847182318',
    description: 'Реквизиты договоров',
  })
  details?: string;
}
