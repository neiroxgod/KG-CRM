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
import { FilialsService } from './filials.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/decorators/auth.decorator';
import { Filial } from './filials.model';
import { CreateFilialDto } from './dto/create-filial.dto';
import { UpdateFilialDto } from './dto/update-filial.dto';

@ApiTags('Филиалы')
@Controller('filials')
export class FilialsController {
  constructor(private filialsService: FilialsService) {}

  @ApiOperation({ summary: 'Создание филиала' })
  @ApiResponse({ status: 200, type: Filial })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() filialDto: CreateFilialDto, @GetUser() employer: any) {
    return this.filialsService.createFilial(filialDto, employer);
  }

  @ApiOperation({ summary: 'Редактирование филиала' })
  @ApiResponse({ status: 200, type: Filial })
  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() filialDto: UpdateFilialDto) {
    return this.filialsService.updateFilial(filialDto);
  }

  @ApiOperation({ summary: 'Список филиалов' })
  @ApiResponse({ status: 200, type: Filial })
  @UseGuards(JwtAuthGuard)
  @Get()
  getList(@GetUser() employer: any) {
    return this.filialsService.getFilialsList(employer);
  }

  @ApiOperation({ summary: 'Удалить филиал' })
  @ApiResponse({ status: 200, type: Filial })
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  delete(@Param('id') id: number) {
    return this.filialsService.deleteFilial(id);
  }
}
