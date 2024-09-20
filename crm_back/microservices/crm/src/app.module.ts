import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { FilialsModule } from './filials/filials.module';
import { BrunchesModule } from './brunches/brunches.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ClientsModule.register([
      {
        name: 'COMMON_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.COMMON_HOST,
          port: Number(process.env.COMMON_PORT),
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
    AuthModule,
    AccountsModule,
    FilialsModule,
    BrunchesModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppModule, ClientsModule],
})
export class AppModule {}
