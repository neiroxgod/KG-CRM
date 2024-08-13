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

    let role = await this.roleService.getRoleByValue('ADMIN');

    if (!role) {
      role = await this.roleService.createRole({
        value: 'admin',
        description: 'Доступ ко всем разделам',
        access_rights: '',
      });
    }

    const entity = {
      accountId: employer.accountId,
      userId: employer.id,
      filialId: employer.filialId,
      roleId: role.id,
    } as Identity;

    const identity = await this.createIdentity(entity);

    const result = await identity.reload({
      include: [{ model: this.userRepository }],
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
    let role = await this.roleService.getRoleByValue('ADMIN');

    if (!role) {
      role = await this.roleService.createRole({
        value: 'admin',
        description: 'Доступ ко всем разделам',
        access_rights: '',
      });
    }

    const entity = {
      accountId: employer.accountId,
      userId: employer.id,
      filialId: employer.filialId,
      roleId: role.id,
    } as Identity;

    const identity = await this.createIdentity(entity);

    await identity.$set('user', [employer.id]);
    identity.user = employer;
    return identity;
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

  async getEmployer(id: number) {
    const entity = await this.identityRepository.findOne({
      where: { userId: id },
      include: { all: true },
    });

    return entity;
  }

  async createuser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }
}
