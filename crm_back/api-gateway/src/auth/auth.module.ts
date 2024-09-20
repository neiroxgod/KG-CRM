import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientProxy, ClientsModule } from '@nestjs/microservices';
import { MicroservicesModule } from 'src/microservices.module';

@Module({
  imports: [MicroservicesModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {
  constructor(@Inject('CRM_SERVICE') private readonly crmClient: ClientProxy) {}
}
