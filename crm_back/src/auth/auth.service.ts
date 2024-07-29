import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateEmployerDto } from 'src/employers/dto/create-employer.dto';
import { EmployersService } from 'src/employers/employers.service';
import * as bcrypt from 'bcryptjs';
import { Employer } from 'src/employers/employers.model';
import { JwtAuthGuard } from './jwt-auth.guard';
@Injectable()
export class AuthService {
  constructor(
    private employerService: EmployersService,
    private jwtService: JwtService,
  ) {}

  async login(employerDto: CreateEmployerDto) {
    const employer = await this.validateUser(employerDto);
    const token = await this.generateToken(employer);
    const data = [{ employer: employer, token }];
    return data;
  }

  async register(employerDto: CreateEmployerDto) {
    const candidate = await this.employerService.getEmployerByUsername(
      employerDto.username,
    );
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким логином уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(employerDto.password, 5);
    const employer = await this.employerService.createEmployer({
      ...employerDto,
      password: hashPassword,
    });

    const token = await this.generateToken(employer);
    const data = [{ employer: employer, token }];
    return data;
  }

  async generateToken(employer: Employer) {
    const payload = {
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

  private async validateUser(employerDto: CreateEmployerDto) {
    const employer = await this.employerService.getEmployerByUsername(
      employerDto.username,
    );
    const passwordEquals = await bcrypt.compare(
      employerDto.password,
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
