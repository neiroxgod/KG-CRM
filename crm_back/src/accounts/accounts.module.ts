import { forwardRef, Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from './accounts.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService],
  imports: [
    SequelizeModule.forFeature([Account]),
    forwardRef(() => AuthModule),
  ],
  exports: [AccountsService],
})
export class AccountsModule {}
