import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { EditUserDto } from './dto/edit-user.dto';
import { Identity } from './identity-model';
import { Op } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { Tasks } from 'src/tasks/tasks.model';
import { Files } from 'src/files/files.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Identity) private identityRepository: typeof Identity,
    private roleService: RolesService,
  ) {}

  async getEmployersList(user: User) {
    const result = await this.identityRepository.findAll({
      include: [
        {
          model: Role,
          as: 'roles',
          where: {
            accountId: user.accountId,
            value: {
              [Op.notIn]: () => ['user'],
            },
          },
        },
        {
          model: User,
          as: 'user',
        },
      ],
    });

    return result;
  }

  async createEmployer(dto: CreateUserDto) {
    const employer = await this.userRepository.create(dto);

    let role = await this.roleService.getRoleByValue(
      'Владелец',
      employer.accountId,
    );

    if (!role) {
      const status = await this.roleService.createBaseRoles(employer.accountId);

      role = await this.roleService.getRoleByValue(
        'Владелец',
        employer.accountId,
      );
    }

    const entity = {
      accountId: employer.accountId,
      userId: employer.id,
      filialId: employer.filialId,
      roleId: role.id,
    } as Identity;

    const identity = await this.createIdentity(entity);

    const result = await identity.reload({
      include: { all: true },
    });
    return result;
  }

  async createIdentity(identity: Identity) {
    const entity = await this.identityRepository.create(identity);
    return entity;
  }

  async addEmployer(dto: CreateUserDto, empl: any) {
    dto.accountId = empl.accountId;
    const employer = await this.userRepository.create(dto);
    let role = await this.roleService.getRoleByValue(
      'Администратор',
      employer.accountId,
    );

    if (!role) {
      await this.roleService.createBaseRoles(employer.accountId);

      role = await this.roleService.getRoleByValue(
        'Администратор', // Стандартная должность
        employer.accountId,
      );
    }

    const entity = {
      accountId: employer.accountId,
      userId: employer.id,
      filialId: employer.filialId,
      roleId: role.id,
    } as Identity;

    const identity = await this.createIdentity(entity);

    const result = await identity.reload({
      include: { all: true },
    });
    return result;
  }

  async getAllEmployers(empl: any) {
    const employers = await this.userRepository.findAll({
      where: {
        accountId: empl.accountId,
      },
      include: { all: true },
    });
    return employers;
  }

  async editEmployer(dto: EditUserDto, empl: any) {
    const employer = await this.userRepository.update(dto, {
      where: {
        id: dto.id,
        accountId: empl.accountId,
      },
      returning: true,
    });

    return employer;
  }

  async deleteEmployer(id: number) {
    try {
      await this.identityRepository.destroy({
        where: {
          userId: id,
        },
      });

      await this.userRepository.destroy({
        where: {
          id,
        },
      });
    } catch (e) {
      console.log(e);
    }

    return true;
  }

  async getEmployerByUsername(username: string) {
    //Поиск пользователя по логину
    const employer = await this.identityRepository.findOne({
      include: {
        model: User,
        as: 'user',
        where: {
          username,
        },
      },
    });
    if (!employer) return null;
    return employer.user;
  }

  async updateEmployersAccountId(id: number, accountId: number) {
    const employer = await this.userRepository.update(
      { accountId },
      {
        where: { id },
      },
    );

    const identity = await this.identityRepository.findOne({
      where: { userId: id },
    });
    identity.accountId = accountId;
    await identity.save();

    return employer;
  }

  async getUser(userId: number) {
    const entity = await this.identityRepository.findOne({
      where: { userId },
      include: [
        { all: true, nested: true },
        {
          model: User,
          as: 'user',
          include: [{ model: Tasks }, { model: Files }],
        },
      ],
    });

    if (!entity) return null;

    return entity;
  }

  async createUser(dto: CreateUserDto, empl: any) {
    dto.accountId = empl.accountId;
    const user = await this.userRepository.create(dto);

    let role = await this.roleService.getRoleByValue('Ученик', user.accountId);

    if (!role) {
      this.roleService.createBaseRoles(user.accountId);
    }

    const entity = {
      accountId: user.accountId,
      userId: user.id,
      filialId: user.filialId,
      roleId: role.id,
    } as Identity;

    const identity = await this.createIdentity(entity);

    const result = await identity.reload({
      include: { all: true },
    });
    return result;
  }

  async getAllUsers(user: any) {
    const users = await this.identityRepository.findAll({
      where: {
        accountId: user.accountId,
      },
      include: { all: true },
    });
    if (!users) return [];
    return users;
  }
}
