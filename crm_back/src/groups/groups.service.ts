import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './groups.model';
import { CreateGroupDto } from './dto/create-group.Dto';

@Injectable()
export class GroupsService {
  constructor(@InjectModel(Group) private groupRepository: typeof Group) {}

  async createGroup(dto: CreateGroupDto, empl?: any) {
    dto.accountId = empl.accountId;
    const group = await this.groupRepository.create(dto);
    return group;
  }

  async getAllGroups(empl: any, filialId?: number) {
    const groups = await this.groupRepository.findAll({
      where: {
        accountId: empl.accountId,
      },
    });
    return groups;
  }

  async updateGroup(dto: CreateGroupDto, id: number) {
    return id;
  }

  async deleteGroup(id: number) {
    await this.groupRepository.destroy({
      where: {
        id,
      },
    });

    return true;
  }

  async getGroup(id: number) {
    const group = await this.groupRepository.findOne({
      where: { id },
    });

    return group;
  }
}
