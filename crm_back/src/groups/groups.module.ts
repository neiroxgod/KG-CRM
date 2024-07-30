import { forwardRef, Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Employer } from 'src/employers/employers.model';
import { EmployerRoles } from 'src/roles/employer-roles.model';
import { Role } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { Group } from './groups.model';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [
    SequelizeModule.forFeature([Group, Employer]),
    forwardRef(() => AuthModule),
  ],
  exports: [GroupsService],
})
export class GroupsModule {}
