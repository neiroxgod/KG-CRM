import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({ example: 'Тестовая школа', description: 'Название аккаунта' })
  caption: string;
  @ApiProperty({ example: 'test@example.ru', description: 'Почта аккаунта' })
  email?: string;
}
