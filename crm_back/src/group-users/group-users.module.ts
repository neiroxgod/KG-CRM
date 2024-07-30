import { forwardRef, Module } from '@nestjs/common';
import { GroupUsersService } from './group-users.service';
import { Group } from 'src/groups/groups.model';
import { GroupUser } from './group-users.model';
import { User } from 'src/users/users.model';
import { AuthModule } from 'src/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { GroupsUserController } from './group-users.controller';

@Module({
  controllers: [GroupsUserController],
  providers: [GroupUsersService],
  imports: [
    SequelizeModule.forFeature([Group, GroupUser, User]),
    forwardRef(() => AuthModule),
  ],
  exports: [GroupUsersService],
})
export class GroupUsersModule {}
