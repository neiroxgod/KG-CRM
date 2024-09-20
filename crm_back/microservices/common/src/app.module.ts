import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ClientsModule.register([
      {
        name: 'CRM_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.CRM_HOST,
          port: parseInt(process.env.CRM_PORT),
        },
      },
      {
        name: 'APP_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.APP_HOST,
          port: parseInt(process.env.APP_PORT),
        },
      },
    ]),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [],
      autoLoadModels: true,
      synchronize: true,
      logging: console.log,
      // sync: { force: true },
    }),
    UsersModule,
    GroupsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppModule, ClientsModule],
})
export class AppModule {}
