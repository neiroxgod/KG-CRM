import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroservicesConnectionService } from './microservices.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CRM_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'crm',
          port: 7002,
        },
      },
      {
        name: 'APP_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'app',
          port: 7003,
        },
      },
      {
        name: 'COMMON_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'common',
          port: 7001,
        },
      },
    ]),
  ],
  providers: [MicroservicesConnectionService],
  exports: [ClientsModule, MicroservicesConnectionService],
})
export class MicroservicesModule {}
