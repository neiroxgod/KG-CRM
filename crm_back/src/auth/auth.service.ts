import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AccountsService } from 'src/accounts/accounts.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.model';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => AccountsService))
    private accountService: AccountsService,
  ) {}

  async login(user: CreateUserDto) {
    const employer = await this.validateUser(user);
    const token = await this.generateToken(employer);
    const data = [{ employer: employer, token }];
    return data;
  }

  async register(user: CreateUserDto) {
    const candidate = await this.userService.getEmployerByUsername(
      user.username,
    );
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким логином уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(user.password, 5);

    const { name, email } = user;
    const account = await this.accountService.createAccount({
      caption: name,
      email,
    });
    const employer = await this.userService.createEmployer({
      ...user,
      password: hashPassword,
    });

    await this.userService.updateEmployersAccountId(employer.id, account.id);
    employer.accountId = account.id;
    const token = await this.generateToken(employer);
    const data = [{ employer: employer, token }];
    return data;
  }

  async generateToken(employer: User) {
    const payload = {
      accountId: employer.accountId,
      username: employer.username,
      id: employer.id,
      roles: employer.roles,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async checkToken() {
    return { status: true };
  }

  private async validateUser(user: CreateUserDto) {
    const employer = await this.userService.getEmployerByUsername(
      user.username,
    );
    const passwordEquals = await bcrypt.compare(
      user.password,
      employer.password,
    );

    if (employer && passwordEquals) {
      return employer;
    }

    throw new UnauthorizedException({
      message: 'Некорректный логин или пароль',
    });
  }
}
