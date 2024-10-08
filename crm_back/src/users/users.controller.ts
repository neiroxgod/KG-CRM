import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/decorators/auth.decorator';
import { EditUserDto } from './dto/edit-user.dto';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({
    summary: 'Регистрация сотрудника (выполняется при регистрации аккаунта)',
  })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Post('/register/')
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createEmployer(userDto);
  }

  @ApiOperation({ summary: 'Создание сотрудника' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Post('/add')
  add(@Body() userDto: CreateUserDto, @GetUser() empl: any) {
    return this.usersService.addEmployer(userDto, empl);
  }

  @ApiOperation({ summary: 'Редактирование пользователя' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Patch('/edit')
  edit(@Body() userDto: EditUserDto, @GetUser() empl: any) {
    return this.usersService.editEmployer(userDto, empl);
  }

  @ApiOperation({ summary: 'Список сотрудников' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get('/employers/list')
  getEmployers(@GetUser() user: any) {
    return this.usersService.getEmployersList(user);
  }

  @ApiOperation({ summary: 'Список сотрудников' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@GetUser() user: any) {
    return this.usersService.getUsersList(user);
  }

  @ApiOperation({ summary: 'Получить пользователя' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Get('/get/:id')
  getUser(@Param('id') id: number) {
    return this.usersService.getUser(id);
  }

  @ApiOperation({ summary: 'Удалить пользователя (Ученик или Сотрудник)' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  deleteEmployer(@Param('id') id: number) {
    return this.usersService.delete(id);
  }

  @ApiOperation({ summary: 'Создание ученика' })
  @ApiResponse({ status: 200, type: User })
  @Post('/user/')
  createUser(@Body() userDto: CreateUserDto, @GetUser() empl: any) {
    return this.usersService.createUser(userDto, empl);
  }

  @ApiOperation({ summary: 'Список учеников' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/')
  getAllUsers(@GetUser() user: any) {
    return this.usersService.getAllUsers(user);
  }
}
