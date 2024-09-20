import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './CreateUser.dto';
import { MicroservicesConnectionService } from 'src/microservices.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly microserviceClient: MicroservicesConnectionService,
  ) {}
  async login(userDto: CreateUserDto) {
    const crmClient = this.microserviceClient.getCrmClient();
    try {
      const result = crmClient.emit('login', userDto).subscribe((res) => {
        console.log('Response from CRM service:', res);
      });
    } catch (error) {
      console.error('Error from CRM service:', error);
    }
  }
}
