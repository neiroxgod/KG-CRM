import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({
    example: 'Документ о приеме на работу',
    description: 'Название файла',
  })
  caption: string;

  @ApiProperty({
    example: 'doc_2024_12_01_24.docx',
    description: 'Название файла',
  })
  originalName: string;

  @ApiProperty({ example: '45', description: 'Айди сотрудника' })
  fileName: string;

  @ApiProperty({ example: '45', description: 'Айди филиала' })
  path: string;

  @ApiProperty({ example: '+79066666666', description: 'Телефон сотрудника' })
  size: number;
}
