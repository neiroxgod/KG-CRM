import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EmployersService } from './employers.service';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { Employer } from './employers.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/decorators/auth.decorator';
import { EditEmployerDto } from './dto/edit-employer.dto';

@ApiTags('Сотрудники')
@Controller('employers')
export class EmployersController {
  constructor(private employerService: EmployersService) {}

  @ApiOperation({
    summary: 'Регистрация сотрудника (выполняется при регистрации аккаунта)',
  })
  @ApiResponse({ status: 200, type: Employer })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() userDto: CreateEmployerDto) {
    return this.employerService.createEmployer(userDto);
  }

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: Employer })
  @UseGuards(JwtAuthGuard)
  @Post('/add')
  add(@Body() userDto: CreateEmployerDto, @GetUser() empl: any) {
    return this.employerService.addEmployer(userDto, empl);
  }

  @ApiOperation({ summary: 'Редактирование пользователя' })
  @ApiResponse({ status: 200, type: Employer })
  @UseGuards(JwtAuthGuard)
  @Patch('/edit')
  edit(@Body() userDto: EditEmployerDto, @GetUser() empl: any) {
    return this.employerService.editEmployer(userDto, empl);
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
  @Delete('/delete/:id')
  deleteEmployer(@Param('id') id: number) {
    return this.employerService.deleteEmployer(id);
  }
}
