import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateEmployerDto } from 'src/employers/dto/create-employer.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() employerDto: CreateEmployerDto) {
    return this.authService.login(employerDto);
  }

  @Post('/register')
  register(@Body() employerDto: CreateEmployerDto) {
    return this.authService.register(employerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/verify')
  verify() {
    return this.authService.checkToken();
  }
}
