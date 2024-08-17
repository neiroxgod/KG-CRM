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
import { UserRoles } from 'src/roles/users-roles.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Identity) private identityRepository: typeof Identity,
    @InjectModel(UserRoles) private userRolesRepository: typeof UserRoles,
    private roleService: RolesService,
  ) {}

  async getEmployersList(user: User) {
    const result = await this.identityRepository.findAll({
      include: [
        {
          model: User,
          as: 'user',
          include: [
            {
              model: UserRoles,
              as: 'roles',
              include: [
                {
                  model: Role,
                  as: 'role',
                  where: { value: { [Op.ne]: 'Ученик' } },
                },
              ],
            },
          ],
          nested: true,
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

      if (!status) {
        throw new Error('Не удалось создать роли');
      }

      role = await this.roleService.getRoleByValue(
        'Владелец',
        employer.accountId,
      );
    }
    // Связываем пользователя с ролью
    this.userRolesRepository.create({
      userId: employer.id,
      roleId: role.id,
    });

    const entity = {
      accountId: employer.accountId,
      userId: employer.id,
      filialId: employer.filialId,
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

      if (!role) {
        throw new Error('Не удалось создать роли');
      }

      role = await this.roleService.getRoleByValue(
        'Администратор', // Стандартная должность
        employer.accountId,
      );
    }

    this.userRolesRepository.create({
      userId: employer.id,
      roleId: role.id,
    });

    const entity = {
      accountId: employer.accountId,
      userId: employer.id,
      filialId: employer.filialId,
    } as Identity;

    const identity = await this.createIdentity(entity);

    const result = await identity.reload({
      include: { all: true },
    });
    return result;
  }

  async getUsersList(empl: any) {
    const result = await this.identityRepository.findAll({
      include: [
        {
          model: User,
          as: 'user',
          include: [
            {
              model: UserRoles,
              as: 'roles',
              include: [
                {
                  model: Role,
                  as: 'role',
                  where: { value: { [Op.in]: 'Ученик' } },
                },
              ],
            },
          ],
          nested: true,
        },
      ],
    });
    return result;
  }

  async editEmployer(dto: EditUserDto, empl: any) {
    const employer = await this.userRepository.update(dto, {
      where: {
        id: dto.id,
        accountId: empl.accountId,
      },
      returning: true,
    });

    if (!employer) return null;

    const identity = await this.identityRepository.findOne({
      where: { userId: dto.id },
      include: { all: true, nested: true },
    });
    if (!identity) return null;

    return identity;
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
        {
          model: User,
          as: 'user',
          include: [
            { model: Tasks },
            { model: Files },
            {
              model: UserRoles,
              as: 'roles',
              include: [
                {
                  model: Role,
                  as: 'role',
                },
              ],
            },
          ],
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

    this.userRolesRepository.create({
      userId: user.id,
      roleId: role.id,
    });

    const entity = {
      accountId: user.accountId,
      userId: user.id,
      filialId: user.filialId,
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
