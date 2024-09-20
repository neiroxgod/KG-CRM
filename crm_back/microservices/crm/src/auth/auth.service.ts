import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './createUser.dto';

@Injectable()
export class AuthService {
  constructor() {}

  async register(user: CreateUserDto) {
    // const candidate = await this.userService.getEmployerByUsername(
    //   user.username,
    // );
    // if (candidate) {
    //   throw new HttpException(
    //     'Пользователь с таким логином уже существует',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    // const hashPassword = await bcrypt.hash(user.password, 5);
    // const { name, email } = user;
    // const account = await this.accountService.createAccount({
    //   caption: name,
    //   email,
    // });
    // const filial = await this.filialService.createMockFilial(account.id);
    // user.accountId = account.id;
    // user.filialId = filial.id;
    // const employer = await this.userService.createEmployer({
    //   // Создает employer и Identity
    //   ...user,
    //   password: hashPassword,
    // });
    // const token = await this.generateToken(employer);
    // const data = [{ employer: employer, token }];
    // return data;
  }
}
