import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { FilesService } from './files.service';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { UploadFileDto } from './dto/upload-file.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Files } from './files.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Файлы и документы')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiOperation({
    summary: 'Загрузка файлов',
  })
  @ApiResponse({ status: 200, type: Files })
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, uniqueSuffix);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadFileDto: UploadFileDto,
  ) {
    return this.filesService.uploadFile(file, uploadFileDto);
  }

  @ApiOperation({
    summary: 'Скачать файл по ID',
  })
  @ApiResponse({ status: 200, type: Files })
  @UseGuards(JwtAuthGuard)
  @Get('/download/:id')
  async downloadFile(@Param('id') id: number, @Res() res: Response) {
    try {
      const file = await this.filesService.getFile(id);
      res.sendFile(file.path);
    } catch (error) {}
  }

  @ApiOperation({
    summary: 'Получить файл по ID',
  })
  @ApiResponse({ status: 200, type: Files })
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getFile(@Param('id') id: number) {
    return this.filesService.getFile(id);
  }

  @ApiOperation({
    summary: 'Получить файлы ученика',
  })
  @ApiResponse({ status: 200, type: Files })
  @UseGuards(JwtAuthGuard)
  @Get('/get/user/:user_id')
  getFileByUser(@Param('user_id') user_id: number) {
    return this.filesService.getFilesByUserId(user_id);
  }

  @ApiOperation({
    summary: 'Получить файлы сотрудника',
  })
  @ApiResponse({ status: 200, type: Files })
  @UseGuards(JwtAuthGuard)
  @Get('/get/employer/:employer_id')
  getFileByEmployer(@Param('employer_id') employer_id: number) {
    return this.filesService.getFilesByUserId(employer_id);
  }

  @ApiOperation({
    summary: 'Удалить файл по ID',
  })
  @ApiResponse({ status: 200, type: Files })
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  deleteFile(@Param('id') id: number) {
    return this.filesService.deleteFileById(id);
  }
}
