import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccountDto {
  @ApiProperty({ example: '1', description: 'Айди аккаунта' })
  id: number;
  @ApiProperty({ example: 'тестовая школа', description: 'Название аккаунта' })
  caption: string;
  @ApiProperty({ example: 'test@example.ru', description: 'Почта аккаунта' })
  email?: string;
}
