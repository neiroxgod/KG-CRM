import { Injectable } from '@nestjs/common';
import { Tasks } from './tasks.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from './dto/create-task.dto';
import { EditTaskDto } from './dto/edit-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Tasks) private taskRepository: typeof Tasks) {}

  async createTask(dto: CreateTaskDto, empl: any) {
    dto.accountId = empl.accountId;
    const task = await this.taskRepository.create(dto);
    return task;
  }

  async getAllTasks(empl: any) {
    const tasks = await this.taskRepository.findAll({
      where: {
        accountId: empl.accountId,
      },
      include: { all: true },
    });
    return tasks;
  }

  async editTask(dto: EditTaskDto, empl: any) {
    const task = await this.taskRepository.update(dto, {
      where: {
        id: dto.id,
        accountId: empl.accountId,
      },
      returning: true,
    });

    return task;
  }

  async deleteTask(id: number) {
    await this.taskRepository.destroy({
      where: {
        id,
      },
    });

    return true;
  }

  async getTasksForUser(userId: number) {
    const userTasks = await this.taskRepository.findAll({
      where: { targetUserId: userId },
      include: { all: true },
    });
    return userTasks;
  }

  async getTasksForEmployer(EmployerId: number) {
    const employerTasks = await this.taskRepository.findAll({
      where: { targetEmployerId: EmployerId },
      include: { all: true },
    });
    return employerTasks;
  }

  async getTask(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      include: { all: true },
    });

    return task;
  }
}
