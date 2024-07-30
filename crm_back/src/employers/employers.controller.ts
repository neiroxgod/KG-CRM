import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { Employer } from './employers.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/decorators/auth.decorator';

@ApiTags('Сотрудники')
@Controller('employers')
export class EmployersController {
  constructor(private employerService: EmployersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: Employer })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() userDto: CreateEmployerDto, @GetUser() employer: any) {
    return this.employerService.createEmployer(userDto, employer);
  }

  @ApiOperation({ summary: 'Список пользователей' })
  @ApiResponse({ status: 200, type: [Employer] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@GetUser() user: any) {
    return this.employerService.getAllEmployers(user);
  }

  @ApiOperation({ summary: 'Получить пользователя' })
  @ApiResponse({ status: 200, type: Employer })
  @UseGuards(JwtAuthGuard)
  @Get('/get/:id')
  getEmployer(@Param('id') id: number) {
    return this.employerService.getEmployer(id);
  }

  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiResponse({ status: 200, type: Employer })
  @UseGuards(JwtAuthGuard)
  @Get('/delete/:id')
  deleteEmployer(@Param('id') id: number) {
    return this.employerService.deleteEmployer(id);
  }
}
