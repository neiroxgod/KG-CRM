import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MicroservicesConnectionService implements OnModuleInit {
  constructor(
    @Inject('CRM_SERVICE') private readonly crmClient: ClientProxy,
    @Inject('APP_SERVICE') private readonly appClient: ClientProxy,
    @Inject('COMMON_SERVICE') private readonly commonClient: ClientProxy,
  ) {}

  async onModuleInit() {
    await Promise.all([
      this.crmClient.connect(),
      this.appClient.connect(),
      this.commonClient.connect(),
    ]);
  }

  getCrmClient(): ClientProxy {
    return this.crmClient;
  }

  getAppClient(): ClientProxy {
    return this.appClient;
  }

  getCommonClient(): ClientProxy {
    return this.commonClient;
  }
}
