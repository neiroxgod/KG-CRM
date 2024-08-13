import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createBaseRoles(acc_id: number) {
    const BaseRoles: CreateRoleDto[] = [
      {
        value: 'Владелец',
        accountId: acc_id,
        description:
          'Предустановленная должность, по умолчанию имеет доступ ко всем разделам и данным.',
        access_rights: '',
      },
      {
        value: 'Администратор',
        accountId: acc_id,
        description:
          'Предустановленная должность, по умолчанию имеет доступ ко всем разделам и данным.',
        access_rights: '',
      },
      {
        value: 'Ученик',
        accountId: acc_id,
        description:
          'Предустановленная должность, по умолчанию имеет доступ ко всем разделам и данным.',
        access_rights: '',
      },
    ];

    const promises = BaseRoles.map((item) => this.roleRepository.create(item));

    // Ждем выполнения всех промисов
    await Promise.all(promises);

    return true;
  }

  async createRole(dto: CreateRoleDto, acc_id: number) {
    dto.accountId = acc_id;
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async getRolesList(acc_id: number) {
    const roles = await this.roleRepository.findAll({
      where: { accountId: acc_id },
    });

    return roles;
  }

  async getRoleByValue(value: string, acc_id: number) {
    const role = await this.roleRepository.findOne({
      where: { value, accountId: acc_id },
    });
    return role;
  }
}
