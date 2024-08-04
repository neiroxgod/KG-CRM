import { forwardRef, Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Employer } from 'src/employers/employers.model';
import { User } from 'src/users/users.model';
import { Tasks } from './tasks.model';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [
    SequelizeModule.forFeature([Employer, User, Tasks]),
    forwardRef(() => AuthModule),
  ],
  exports: [TasksService],
})
export class TasksModule {}
