import { forwardRef, Module } from '@nestjs/common';
import { FilialsService } from './filials.service';
import { FilialsController } from './filials.controller';
import { Filial } from './filials.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [FilialsService],
  controllers: [FilialsController],
  imports: [SequelizeModule.forFeature([Filial]), forwardRef(() => AuthModule)],
  exports: [FilialsService],
})
export class FilialsModule {}
