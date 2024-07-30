import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { Employer } from './employers.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('employers')
export class EmployersController {
  constructor(private employerService: EmployersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: Employer })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() userDto: CreateEmployerDto) {
    return this.employerService.createEmployer(userDto);
  }

  @ApiOperation({ summary: 'Список пользователей' })
  @ApiResponse({ status: 200, type: [Employer] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.employerService.getAllEmployers();
  }

  @ApiOperation({ summary: 'Получить пользователя' })
  @ApiResponse({ status: 200, type: Employer })
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getEmployer(@Param('id') id: number) {
    return this.employerService.getEmployer(id);
  }
}
