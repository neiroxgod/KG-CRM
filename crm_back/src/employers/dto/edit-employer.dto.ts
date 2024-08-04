import { ApiProperty } from '@nestjs/swagger';

export class EditEmployerDto {
  @ApiProperty({ example: '1', description: 'Идентификатор сотрудника' })
  id: number;
  @ApiProperty({ example: 'best_login', description: 'Логин сотрудника' })
  username: string;
  @ApiProperty({ example: '45', description: 'Айди сотрудника' })
  accountId?: number;
  @ApiProperty({ example: '45', description: 'Айди филиала' })
  filialId?: number;
  @ApiProperty({
    example: 'Иванов Иван Иванович',
    description: 'Фио сотрудника',
  })
  name: string;
  @ApiProperty({ example: '+79066666666', description: 'Телефон сотрудника' })
  phone: string;
  @ApiProperty({ example: '411135', description: 'Пароль сотрудника' })
  password: string;
  @ApiProperty({ example: 'test@example.ru', description: 'Почта сотрудника' })
  email: string;
  @ApiProperty({ example: '45', description: 'название школы' })
  caption?: string;
}
