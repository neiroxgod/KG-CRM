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

  async addEmployer(dto: CreateEmployerDto, empl: any) {
    dto.accountId = empl.accountId;
    const employer = await this.employerRepository.create(dto);
    const role = await this.roleService.getRoleByValue('ADMIN');
    await employer.$set('roles', [role.id]);
    employer.roles = [role];
    return employer;
  }

  async getAllEmployers(empl: any) {
    console.log(empl);
    const employers = await this.employerRepository.findAll({
      where: {
        accountId: empl.accountId,
      },
      include: { all: true },
    });
    return employers;
  }

  async deleteEmployer(id: number) {
    await this.employerRepository.destroy({
      where: {
        id,
      },
    });
  }

  async getEmployerByUsername(username: string) {
    //Уникальное поле, логин
    const Employer = await this.employerRepository.findOne({
      where: { username },
      include: { all: true },
    });
    return Employer;
  }

  async updateEmployersAccountId(id: number, accountId: number) {
    const employer = await this.employerRepository.update(
      { accountId },
      {
        where: { id },
      },
    );

    return employer;
  }

  async getEmployer(id: number) {
    const employer = await this.employerRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }
}
