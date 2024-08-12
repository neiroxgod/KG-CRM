import { forwardRef, Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Files } from './files.model';
import { MulterModule } from '@nestjs/platform-express';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/users.model';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [
    SequelizeModule.forFeature([Files, User]),
    MulterModule.register({
      dest: './uploads',
    }),
    forwardRef(() => AuthModule),
  ],
})
export class FilesModule {}
