import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GroupUser } from './group-users.model';
import { CreateGroupUserDto } from './dto/group-users-create.dto';
import sequelize from 'sequelize';

@Injectable()
export class GroupUsersService {
  constructor(
    @InjectModel(GroupUser) private groupUserRepository: typeof GroupUser,
  ) {}

  async addUserToGroup(dto: CreateGroupUserDto) {
    await this.groupUserRepository.create(dto);
    const users = this.getGroupUsers(dto.groupId);
    return users;
  }

  async getGroupUsers(groupId: number) {
    const groupUsers = await this.groupUserRepository.findAll({
      where: {
        groupId,
      },
    });
    return groupUsers;
  }

  async deleteUserFromGroup(groupId: number, userId: number) {
    await this.groupUserRepository.update(
      { detachtime: sequelize.literal('NOW()') },
      {
        where: {
          groupId,
          userId,
        },
      },
    );

    return true;
  }
}
