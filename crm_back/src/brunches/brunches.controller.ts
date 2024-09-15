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
import { BrunchesService } from './brunches.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/decorators/auth.decorator';
import { Brunch } from './brunches.model';
import { CreateBrunchDto } from './dto/createBrunch.dto';
import { UpdateBrunchDto } from './dto/updateBrunch.dto';
import { User } from '@prisma/client';

@ApiTags('Аудитории')
@Controller('brunches')
export class BrunchesController {
  constructor(private brunchService: BrunchesService) {}

  @ApiOperation({ summary: 'Создание аудитории' })
  @ApiResponse({ status: 200, type: Brunch })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() filialDto: CreateBrunchDto, @GetUser() employer: any) {
    return this.brunchService.createBrunch(filialDto, employer);
  }

  @ApiOperation({ summary: 'Редактирование аудитории' })
  @ApiResponse({ status: 200, type: Brunch })
  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() filialDto: UpdateBrunchDto) {
    return this.brunchService.updateBrunch(filialDto);
  }

  @ApiOperation({ summary: 'Список аудиторий' })
  @ApiResponse({ status: 200, type: Brunch })
  @UseGuards(JwtAuthGuard)
  @Get()
  getList(@GetUser() employer: User) {
    return this.brunchService.getBrunchesList(employer);
  }

  @ApiOperation({ summary: 'Список аудитории по ID филиала' })
  @ApiResponse({ status: 200, type: Brunch })
  @UseGuards(JwtAuthGuard)
  @Get('/getByfilial/:filial_id')
  getListByFilialID(@Param('filial_id') filialId: number) {
    return this.brunchService.getBrunchesListByFilialId(filialId);
  }

  @ApiOperation({ summary: 'Получить аудиторию по АЙДИ' })
  @ApiResponse({ status: 200, type: Brunch })
  @UseGuards(JwtAuthGuard)
  @Get('/get/:id')
  getById(@Param('id') brunchId: number) {
    return this.brunchService.getBrunchById(brunchId);
  }

  @ApiOperation({ summary: 'Удалить аудиторию' })
  @ApiResponse({ status: 200, type: Brunch })
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  delete(@Param('id') id: number) {
    return this.brunchService.deleteBrunch(id);
  }
}
