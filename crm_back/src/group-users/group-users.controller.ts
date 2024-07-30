import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GroupUsersService } from './group-users.service';
import { CreateGroupUserDto } from './dto/group-users-create.dto';
import { GroupUser } from './group-users.model';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Ученики в группе')
@Controller('groupUser')
export class GroupsUserController {
  constructor(private groupUserService: GroupUsersService) {}

  @ApiOperation({ summary: 'Добавление ученика в группу' })
  @ApiResponse({ status: 200, type: GroupUser })
  @UseGuards(JwtAuthGuard)
  @Post('/add')
  addUserToGroup(@Body() createGroupUserDto: CreateGroupUserDto) {
    return this.groupUserService.addUserToGroup(createGroupUserDto);
  }

  @ApiOperation({ summary: 'Получить учеников группы' })
  @ApiResponse({ status: 200, type: GroupUser })
  @UseGuards(JwtAuthGuard)
  @Get('/list/:groupId')
  getGroupUsers(@Param('groupId') groupId: number) {
    return this.groupUserService.getGroupUsers(groupId);
  }

  @ApiOperation({ summary: 'Удалить ученика из группы' })
  @ApiResponse({ status: 200, type: GroupUser })
  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  deleteUserFromGroup(@Body() groupId: number, userId: number) {
    return this.groupUserService.deleteUserFromGroup(groupId, userId);
  }
}
