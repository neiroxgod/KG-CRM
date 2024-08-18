import { Injectable } from '@nestjs/common';
import { Tasks } from './tasks.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from './dto/create-task.dto';
import { EditTaskDto } from './dto/edit-task.dto';
import { UsersTasks } from './users-tasks.model';
import { TaskTypes } from './tasks-types.model';
import { UsersService } from 'src/users/users.service';
import { Op } from 'sequelize';
import { User } from 'src/users/users.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Tasks) private taskRepository: typeof Tasks,
    @InjectModel(UsersTasks) private usersTasksRepository: typeof UsersTasks,
    @InjectModel(TaskTypes) private taskTypesRepository: typeof TaskTypes,
    private usersService: UsersService,
  ) {
    this.createDefaultTaskTypes();
  }

  async createTask(dto: CreateTaskDto, empl: any) {
    dto.accountId = empl.accountId;
    const task = await this.taskRepository.create({
      text: dto.text,
      userId: empl.id, //Автор задачи
      targetUserId: dto.targetUserId ? dto.targetUserId : null, //Объект задачи
      accountId: empl.accountId,
      taskType: dto.taskType,
      timedeadline: dto.timedeadline,
    });

    if (!dto.objType) {
      const user = await this.usersService.getUser(dto.targetUserId);
      dto.objType =
        user.user.roles[0].role.value === 'Ученик' ? 'user' : 'employer';
    }

    const userTask = await this.usersTasksRepository.create({
      taskId: task.id,
      userId: dto.responsibleUserId, // aka responsible
      objType: dto.objType ? dto.objType : 'user', // user/employer
    });

    const result = { ...task, userTask };
    return result;
  }

  async getAllTasks(empl: any) {
    //usersTasksRepository maybe?
    const tasks = await this.taskRepository.findAll({
      where: {
        accountId: empl.accountId,
      },
      include: { all: true },
    });
    return tasks;
  }

  async editTask(dto: EditTaskDto, empl: any) {
    const task = await this.taskRepository.update(
      {
        text: dto.text,
        result: dto.result,
        timedeadline: dto.timedeadline,
        timefinish: dto.timefinish,
      },
      {
        where: {
          id: dto.id,
          accountId: empl.accountId,
        },
        returning: true,
      },
    );

    const userTask = await this.usersTasksRepository.findAll({
      where: {
        taskId: dto.id,
      },
    });

    userTask.map((item) => {
      item.userId = dto.responsibleUserId;
      item.save();
    });

    return task;
  }

  async getTaskTypes(user: User) {
    const taskTypes = await this.taskTypesRepository.findAll({
      where: {
        [Op.or]: [{ accountId: null }, { accountId: user.accountId }],
      },
      include: [
        {
          model: Tasks,
          as: 'tasks',
          where: { accountId: user.accountId },
          required: false,
          include: [
            {
              model: UsersTasks,
              as: 'usersTasks',
              required: false,
              include: [
                {
                  model: User,
                  as: 'user',
                  required: false,
                },
              ],
            },
          ],
        },
      ],
    });
    return taskTypes;
  }

  async getTaskType(id: number) {
    const taskType = await this.taskTypesRepository.findOne({
      where: {
        id,
      },
    });
    return taskType;
  }

  async createTaskType(dto: { caption: string; accentColor: string }) {
    const taskType = await this.taskTypesRepository.create(dto);
    return taskType;
  }
  //Write method to edit taskTypes
  async editTaskType(
    dto: { caption: string; accentColor: string },
    id: number,
  ) {
    const taskType = await this.taskTypesRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
    return true;
  }

  async createDefaultTaskTypes() {
    const defaultTaskTypes = [
      //БЕЗ ACCOUNT_ID !!! Так как предустановленные приоритеты, и их нельзя редактировать/удалять по умолчанию
      { caption: 'Очень высокий приоритет', accentColor: 'rgb(255, 99, 132)' },
      { caption: 'Высокий приоритет', accentColor: 'rgb(255, 159, 64)' },
      { caption: 'Средний приоритет', accentColor: 'rgb(255, 205, 86)' },
      { caption: 'Обычный приоритет', accentColor: 'rgb(75, 192, 192)' },
    ];

    const count = await this.taskTypesRepository.count({
      where: {
        [Op.or]: defaultTaskTypes.map((item) => ({
          caption: item.caption,
          accentColor: item.accentColor,
        })),
      },
    });
    if (count > 0) return true;

    await this.taskTypesRepository.bulkCreate(defaultTaskTypes);

    return true;
  }

  async deleteTaskType(id: number) {
    await this.taskTypesRepository.destroy({
      where: {
        id,
      },
    });
    return true;
  }

  async deleteTask(id: number) {
    await this.taskRepository.destroy({
      where: {
        id,
      },
    });

    await this.usersTasksRepository.destroy({
      where: {
        taskId: id,
      },
    });

    return true;
  }

  async getTasksForUser(userId: number) {
    const userTasks = await this.taskRepository.findAll({
      include: { all: true },
    });
    return userTasks;
  }

  async getTask(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      include: { all: true },
    });

    return task;
  }
}
