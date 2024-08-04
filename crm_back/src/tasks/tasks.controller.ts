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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/decorators/auth.decorator';
import { TasksService } from './tasks.service';
import { Tasks } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { EditTaskDto } from './dto/edit-task.dto';

@ApiTags('Задачи')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @ApiOperation({
    summary: 'Создание задачи',
  })
  @ApiResponse({ status: 200, type: Tasks })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() taskDto: CreateTaskDto, @GetUser() empl: any) {
    return this.tasksService.createTask(taskDto, empl);
  }

  @ApiOperation({ summary: 'Редактирование задачи' })
  @ApiResponse({ status: 200, type: Tasks })
  @UseGuards(JwtAuthGuard)
  @Patch('/edit')
  edit(@Body() taskDto: EditTaskDto, @GetUser() empl: any) {
    return this.tasksService.editTask(taskDto, empl);
  }

  @ApiOperation({ summary: 'Список задач' })
  @ApiResponse({ status: 200, type: [Tasks] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@GetUser() empl: any) {
    return this.tasksService.getAllTasks(empl);
  }

  @ApiOperation({ summary: 'Получить задачи по ученику' })
  @ApiResponse({ status: 200, type: Tasks })
  @UseGuards(JwtAuthGuard)
  @Get('/get/user/:user_id')
  getTasksForUser(@Param('user_id') user_id: number) {
    return this.tasksService.getTasksForUser(user_id);
  }

  @ApiOperation({ summary: 'Получить задачи по сотруднику' })
  @ApiResponse({ status: 200, type: Tasks })
  @UseGuards(JwtAuthGuard)
  @Get('/get/employer/:employer_id')
  getTasksForEmployer(@Param('employer_id') employer_id: number) {
    return this.tasksService.getTasksForEmployer(employer_id);
  }

  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiResponse({ status: 200, type: Tasks })
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  deleteEmployer(@Param('id') id: number) {
    return this.tasksService.deleteTask(id);
  }
}
