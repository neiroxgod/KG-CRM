import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorators/auth.decorator';

@ApiTags('Роли сотрудников')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Post()
  create(@Body() dto: CreateRoleDto, @GetUser() empl: any) {
    return this.roleService.createRole(dto, empl.accountId);
  }

  @Get('')
  getList(@GetUser() empl: any) {
    return this.roleService.getRolesList(empl.accountId);
  }

  @Get('/:value')
  getByValue(@Param('value') value: string, @GetUser() empl: any) {
    return this.roleService.getRoleByValue(value, empl.accountId);
  }
}
