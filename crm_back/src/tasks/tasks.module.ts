import { forwardRef, Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/users.model';
import { Tasks } from './tasks.model';
import { UsersTasks } from './users-tasks.model';
import { TaskTypes } from './tasks-types.model';
import { UsersService } from 'src/users/users.service';
import { Identity } from 'src/users/identity-model';
import { UserRoles } from 'src/roles/users-roles.model';
import { Role } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';

@Module({
  providers: [TasksService, UsersService, RolesService],
  controllers: [TasksController],
  imports: [
    SequelizeModule.forFeature([
      User,
      Tasks,
      Identity,
      UserRoles,
      UsersTasks,
      TaskTypes,
      Role,
    ]),
    forwardRef(() => AuthModule),
  ],
  exports: [TasksService],
})
export class TasksModule {}
