import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { EditUserDto } from './dto/edit-user.dto';
import { Identity } from './identity-model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Identity) private identityRepository: typeof Identity,
    private roleService: RolesService,
  ) {}

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
        'Администратор',
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
    await this.userRepository.destroy({
      where: {
        id,
      },
    });

    return true;
  }

  async getEmployerByUsername(username: string) {
    //Уникальное поле, логин
    const employer = await this.userRepository.findOne({
      where: { username },
      include: { all: true },
    });
    return employer;
  }

  async updateEmployersAccountId(id: number, accountId: number) {
    const employer = await this.userRepository.update(
      { accountId },
      {
        where: { id },
      },
    );

    return employer;
  }

  async getUser(id: number) {
    const entity = await this.identityRepository.findOne({
      where: { userId: id },
      include: { all: true },
    });
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

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }
}
