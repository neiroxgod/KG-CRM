import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: '1', description: 'ID аккаунта' })
  accountId: number;

  @ApiProperty({ example: '1', description: 'ID филиала' })
  filialId: number;

  @ApiProperty({ example: 'user@email.ru', description: 'Почта пользователя' })
  readonly email: string;

  @ApiProperty({
    example: 'Иванов Иван Иванович',
    description: 'ФИО пользователя',
  })
  readonly name: string;

  @ApiProperty({ example: 'best_login', description: 'Логин пользователя' })
  readonly username: string;

  @ApiProperty({ example: 'password123', description: 'Пароль пользователя' })
  readonly password: string;
}
