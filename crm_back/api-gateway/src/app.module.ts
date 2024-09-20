import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MicroservicesModule } from './microservices.module';

@Module({
  imports: [AuthModule, MicroservicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('AppModules loadedss');
  }
}
