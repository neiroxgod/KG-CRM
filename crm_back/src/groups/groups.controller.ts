import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/decorators/auth.decorator';
import { CreateGroupDto } from './dto/create-group.Dto';
import { Group } from './groups.model';

@ApiTags('Группы')
@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @ApiOperation({ summary: 'Создание группы' })
  @ApiResponse({ status: 200, type: Group })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() groupDto: CreateGroupDto, @GetUser() employer: any) {
    return this.groupsService.createGroup(groupDto, employer);
  }

  @ApiOperation({ summary: 'Список групп' })
  @ApiResponse({ status: 200, type: [Group] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@GetUser() user: any, @Param('filialId') filialId?: number) {
    return this.groupsService.getAllGroups(user, filialId);
  }

  @ApiOperation({ summary: 'Получить группу' })
  @ApiResponse({ status: 200, type: Group })
  @UseGuards(JwtAuthGuard)
  @Get('/get/:id')
  getGroup(@Param('id') id: number) {
    return this.groupsService.getGroup(id);
  }

  @ApiOperation({ summary: 'Редактировать группу' })
  @ApiResponse({ status: 200, type: Group })
  @UseGuards(JwtAuthGuard)
  @Patch('/update')
  editGroup(@Body() createGroupDto: CreateGroupDto, @Param('id') id: number) {
    return this.groupsService.updateGroup(createGroupDto, id);
  }

  @ApiOperation({ summary: 'Удалить группу' })
  @ApiResponse({ status: 200, type: Group })
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  deleteGroup(@Param('id') id: number) {
    return this.groupsService.deleteGroup(id);
  }
}
