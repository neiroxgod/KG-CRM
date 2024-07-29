import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAccountDto } from './dto/createAccount.dto';
import { Account } from './accounts.model';
import { UpdateAccountDto } from './dto/updateAccount.dto';

@ApiTags('Аккаунт')
@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @ApiOperation({ summary: 'Создание аккаунта' })
  @ApiResponse({ status: 200, type: Account })
  @UseGuards(JwtAuthGuard)
  @Post('/add')
  createAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.createAccount(createAccountDto);
  }

  @ApiOperation({ summary: 'Получить аккаунт по ID' })
  @ApiResponse({ status: 200, type: Account })
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getAccountById(@Param('id') id: number) {
    return this.accountsService.getAccountById(id);
  }

  @ApiOperation({ summary: 'Сохранить аккаунт' })
  @ApiResponse({ status: 200, type: Account })
  @UseGuards(JwtAuthGuard)
  @Patch('/edit')
  saveAccount(@Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.saveAccount(updateAccountDto);
  }
}
