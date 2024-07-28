import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { Employer } from 'src/employers/employers.model';
import { EmployerRoles } from './employer-roles.model';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Role, Employer, EmployerRoles])],
  exports: [RolesService],
})
export class RolesModule {}
