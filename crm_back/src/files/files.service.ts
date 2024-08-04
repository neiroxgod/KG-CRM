import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Files } from './files.model';
import { UploadFileDto } from './dto/upload-file.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(Files)
    private readonly fileRepository: typeof Files,
  ) {
    this.ensureUploadDirectoryExists();
  }

  private ensureUploadDirectoryExists() {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
  }

  uploadFile(
    file: Express.Multer.File,
    uploadFileDto: UploadFileDto,
  ): Promise<Files> {
    const newFile = new this.fileRepository(uploadFileDto);
    return newFile.save();
  }

  async getFile(id: number): Promise<Files> {
    const file = await this.fileRepository.findOne({ where: { id } });

    return file;
  }

  async getFilesList(id: number, empl: any) {
    const file = await this.fileRepository.findAll({
      where: { accountId: empl.accountId },
    });
    return file;
  }

  async getFilesByUserId(user_id: number) {
    const files = await this.fileRepository.findAll({
      where: {
        userId: user_id,
      },
    });

    return files;
  }

  async getFilesByEmployerId(employer_id: number) {
    const files = await this.fileRepository.findAll({
      where: {
        employerId: employer_id,
      },
    });

    return files;
  }

  async deleteFileById(id: number): Promise<void> {
    const file = await this.getFile(id);
    try {
      await fs.promises.unlink(file.path); // Используйте fs.promises.unlink для удаления файла
      await this.fileRepository.destroy({ where: { id } });
    } catch (error) {
      throw new Error('Error deleting file');
    }
  }
}
