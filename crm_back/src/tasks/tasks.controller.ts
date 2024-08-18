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
import { TasksCreatingAttrs } from './tasks.model';
import { TaskTypes } from './tasks-types.model';
import { User } from 'src/users/users.model';

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
    taskDto.timedeadline = new Date(taskDto.timedeadline).toISOString();
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

  @ApiOperation({ summary: 'Список типов задач' })
  @ApiResponse({ status: 200, type: [TaskTypes] })
  @UseGuards(JwtAuthGuard)
  @Get('/types')
  getAllTaskTypes(@GetUser() user: User) {
    return this.tasksService.getTaskTypes(user);
  }

  @ApiOperation({ summary: 'Получить тип задачи по id' })
  @ApiResponse({ status: 200, type: TaskTypes })
  @UseGuards(JwtAuthGuard)
  @Get('/types/:id')
  getTaskType(@Param('id') id: number) {
    return this.tasksService.getTaskType(id);
  }

  @ApiOperation({ summary: 'Создать тип задачи' })
  @ApiResponse({ status: 200, type: TaskTypes })
  @UseGuards(JwtAuthGuard)
  @Post('/types')
  createTaskType(@Body() dto: { caption: string; accentColor: string }) {
    return this.tasksService.createTaskType(dto);
  }

  @ApiOperation({ summary: 'Редактировать тип задачи' })
  @ApiResponse({ status: 200, type: TaskTypes })
  @UseGuards(JwtAuthGuard)
  @Patch('/types/:id')
  editTaskType(
    @Body() dto: { caption: string; accentColor: string },
    @Param('id') id: number,
  ) {
    return this.tasksService.editTaskType(dto, id);
  }

  @ApiOperation({ summary: 'Удалить тип задачи' })
  @ApiResponse({ status: 200, type: TaskTypes })
  @UseGuards(JwtAuthGuard)
  @Delete('/types/:id')
  deleteTaskType(@Param('id') id: number) {
    return this.tasksService.deleteTaskType(id);
  }

  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiResponse({ status: 200, type: Tasks })
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  deleteEmployer(@Param('id') id: number) {
    return this.tasksService.deleteTask(id);
  }
}
