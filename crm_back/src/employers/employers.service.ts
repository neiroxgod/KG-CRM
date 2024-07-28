import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employer } from './employers.model';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class EmployersService {
  constructor(
    @InjectModel(Employer) private employerRepository: typeof Employer,
    private roleService: RolesService,
  ) {}

  async createEmployer(dto: CreateEmployerDto) {
    const employer = await this.employerRepository.create(dto);
    const role = await this.roleService.getRoleByValue('ADMIN');
    await employer.$set('roles', [role.id]);
    employer.roles = [role];
    return employer;
  }

  async getAllEmployers() {
    const employers = await this.employerRepository.findAll({
      include: { all: true },
    });
    return employers;
  }

  async getEmployerByUsername(username: string) {
    const Employer = await this.employerRepository.findOne({
      where: { username },
      include: { all: true },
    });
    return Employer;
  }
}
