import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/employer-roles.model';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { Account } from './accounts/accounts.model';
import { GroupsModule } from './groups/groups.module';
import { Group } from './groups/groups.model';
import { GroupUsersModule } from './group-users/group-users.module';
import { GroupUser } from './group-users/group-users.model';
import { TasksModule } from './tasks/tasks.module';
import { Tasks } from './tasks/tasks.model';
import { FilesModule } from './files/files.module';
import { Files } from './files/files.model';
import { FilialsModule } from './filials/filials.module';
import { Filial } from './filials/filials.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Role,
        UserRoles,
        Account,
        Group,
        GroupUser,
        Tasks,
        Files,
        Filial,
      ],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    AccountsModule,
    GroupsModule,
    GroupUsersModule,
    TasksModule,
    FilesModule,
    FilialsModule,
  ],
})
export class AppModule {}
