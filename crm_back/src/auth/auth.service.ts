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
import { Identity } from 'src/users/identity-model';
import { FilialsService } from 'src/filials/filials.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => AccountsService))
    private accountService: AccountsService,
    @Inject(forwardRef(() => FilialsService))
    private filialService: FilialsService,
  ) {}

  async login(user: CreateUserDto) {
    const employer = await this.validateUser(user);
    if (!employer) return false;
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

    const filial = await this.filialService.createMockFilial(account.id);

    user.accountId = account.id;
    user.filialId = filial.id;

    const employer = await this.userService.createEmployer({
      // Создает employer и Identity
      ...user,
      password: hashPassword,
    });

    const token = await this.generateToken(employer);
    const data = [{ employer: employer, token }];
    return data;
  }

  async generateToken(entity: Identity) {
    const { accountId, username, id } = entity.user;
    const payload = {
      accountId: accountId,
      username: username,
      id: id,
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
    if (!employer) return false;

    const entity = await this.userService.getUser(employer.id);

    const passwordEquals = await bcrypt.compare(
      user.password,
      employer.password,
    );

    if (employer && passwordEquals) {
      return entity;
    }

    throw new UnauthorizedException({
      message: 'Некорректный логин или пароль',
    });
  }
}
