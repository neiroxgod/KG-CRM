import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Filial } from './filials.model';
import { GetUser } from 'src/decorators/auth.decorator';
import { CreateFilialDto } from './dto/create-filial.dto';
import { UpdateFilialDto } from './dto/update-filial.dto';

@Injectable()
export class FilialsService {
  constructor(@InjectModel(Filial) private filialRepository: typeof Filial) {}

  createFilial = async function (
    data: CreateFilialDto,
    employer: any,
  ): Promise<Object> {
    data.accountId = employer.accountId;
    const filial = await this.filialRepository.create(data);
    return filial;
  };

  updateFilial = async function (data: UpdateFilialDto): Promise<Object> {
    const filial = await this.filialRepository.update(data, {
      where: { id: data.id },
    });

    return filial;
  };

  getFilialsList = async function (employer: any): Promise<Object> {
    const filials = await this.filialRepository.findAll({
      where: { accountId: employer.accountId },
    });
    return filials;
  };

  deleteFilial = async function (id: number): Promise<Boolean> {
    await this.filialRepository.destroy({
      where: { id },
    });
    return true;
  };
}
