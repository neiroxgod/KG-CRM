import { forwardRef, Module } from '@nestjs/common';
import { BrunchesService } from './brunches.service';
import { BrunchesController } from './brunches.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brunch } from './brunches.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [BrunchesService],
  controllers: [BrunchesController],
  imports: [SequelizeModule.forFeature([Brunch]), forwardRef(() => AuthModule)],
  exports: [BrunchesService],
})
export class BrunchesModule {}
