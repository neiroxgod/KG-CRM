import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Account } from './accounts.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAccountDto } from './dto/createAccount.dto';
import { UpdateAccountDto } from './dto/updateAccount.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account) private accountRepository: typeof Account,
  ) {}

  async createAccount(dto: CreateAccountDto) {
    const account = await this.accountRepository.create(dto);
    return account;
  }

  async getAccountById(id: number) {
    const account = await this.accountRepository.findOne({
      where: {
        id,
      },
    });
    return account;
  }

  async saveAccount(dto: UpdateAccountDto) {
    const account = await this.accountRepository.update(dto, {
      where: { id: dto.id },
      returning: true,
    });
    return account;
  }
}
