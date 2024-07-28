import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { EmployersModule } from './employers/employers.module';
import { Role } from './roles/roles.model';
import { EmployerRoles } from './roles/employer-roles.model';
import { Employer } from './employers/employers.model';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, EmployerRoles, Employer],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    EmployersModule,
    AuthModule,
  ],
})
export class AppModule {}
