import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class AppService {
  async login(@Payload() userDto) {
    // Здесь вы можете выполнить реальную логику аутентификации
    console.log('Received login request:', userDto);

    return {
      message: 'Login request processed',
      receivedData: userDto,
    };
  }
  getHello(): string {
    console.log('Hello world');
    return 'Hello World!';
  }
}
