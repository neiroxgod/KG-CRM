import { forwardRef, Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Group } from './groups.model';
import { Brunch } from 'src/brunches/brunches.model';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [
    SequelizeModule.forFeature([Group, Brunch]),
    forwardRef(() => AuthModule),
  ],
  exports: [GroupsService],
})
export class GroupsModule {}
