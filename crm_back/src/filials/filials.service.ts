import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Filial } from './filials.model';
import { GetUser } from 'src/decorators/auth.decorator';
import { CreateFilialDto } from './dto/create-filial.dto';
import { UpdateFilialDto } from './dto/update-filial.dto';

@Injectable()
export class FilialsService {
  constructor(@InjectModel(Filial) private filialRepository: typeof Filial) {}

  createMockFilial = async function (accountId: number) {
    const mock = {
      caption: 'По умолчанию',
      accountId: accountId,
      address: 'По умолчанию',
    };

    const filial = await this.filialRepository.create(mock);
    return filial;
  };

  createFilial = async function (
    data: CreateFilialDto,
    employer: any,
  ): Promise<Object> {
    data.accountId = employer.accountId;
    const filial = await this.filialRepository.create(data);
    return filial;
  };

  updateFilial = async function (data: UpdateFilialDto): Promise<Object> {
    const [affectedCount, updatedFilials] = await this.filialRepository.update(
      data,
      {
        where: { id: data.id },
        returning: true,
      },
    );

    return updatedFilials[0];
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
