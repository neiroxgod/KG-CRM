import { ApiProperty } from '@nestjs/swagger';

export class EditUserDto {
  @ApiProperty({ example: '11', description: 'ID пользователя' })
  readonly id: number;

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
