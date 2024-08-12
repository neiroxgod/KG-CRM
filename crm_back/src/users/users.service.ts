import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createEmployer(dto: CreateUserDto) {
    const employer = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('ADMIN');
    await employer.$set('roles', [role.id]);
    employer.roles = [role];
    return employer;
  }

  async addEmployer(dto: CreateUserDto, empl: any) {
    dto.accountId = empl.accountId;
    const employer = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('ADMIN');
    await employer.$set('roles', [role.id]);
    employer.roles = [role];
    return employer;
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
    const employer = await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });

    return employer;
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
