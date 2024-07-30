import { forwardRef, Module } from '@nestjs/common';
import { EmployersController } from './employers.controller';
import { EmployersService } from './employers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employer } from './employers.model';
import { Role } from 'src/roles/roles.model';
import { EmployerRoles } from 'src/roles/employer-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [EmployersController],
  providers: [EmployersService],
  imports: [
    SequelizeModule.forFeature([Employer, Role, EmployerRoles]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [EmployersService],
})
export class EmployersModule {}
