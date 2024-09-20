import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBrunchDto } from './dto/createBrunch.dto';
import { UpdateBrunchDto } from './dto/updateBrunch.dto';
import { Brunch } from './brunches.model';
import { Filial } from 'src/filials/filials.model';

@Injectable()
export class BrunchesService {
  constructor(@InjectModel(Brunch) private brunchRepository: typeof Brunch) {}

  createBrunch = async function (
    data: CreateBrunchDto,
    employer: any,
  ): Promise<Object> {
    let brunch = await this.brunchRepository.create(data, {
      include: [
        {
          model: Filial,
        },
      ],
    });
    console.log(brunch);
    // brunch.filialCaption = brunch.filial.caption;

    return brunch;
  };

  updateBrunch = async function (data: UpdateBrunchDto): Promise<Object> {
    const [affectedCount, updatedFilials] = await this.brunchRepository.update(
      data,
      {
        where: { id: data.id },
        returning: true,
        include: [
          {
            model: Filial,
          },
        ],
      },
    );
    console.log(updatedFilials);
    // updatedFilials[0].filialCaption = updatedFilials[0].filial.caption;
    return updatedFilials[0];
  };

  getBrunchesList = async function (employer: any): Promise<Object> {
    const brunches = await this.brunchRepository.findAll({
      include: [
        {
          model: Filial,
          where: { accountId: employer.accountId },
        },
      ],
    });

    const brunchesWithFilialCaption = brunches.map((brunch) => ({
      ...brunch.get({ plain: true }), // Преобразуем Sequelize модель в простой объект
      filialCaption: brunch.filial.caption,
    }));
    return brunchesWithFilialCaption;
  };

  getBrunchesListByFilialId = async function (id: number): Promise<Object> {
    const brunches = await this.brunchRepository.findAll({
      include: [
        {
          model: Filial,
          where: { id },
        },
      ],
    });

    const brunchesWithFilialCaption = brunches.map((brunch) => ({
      ...brunch.get({ plain: true }), // Преобразуем Sequelize модель в простой объект
      filialCaption: brunch.filial.caption,
    }));
    return brunchesWithFilialCaption;
  };

  getBrunchById = async function (id: number): Promise<Object> {
    const brunch = await this.brunchRepository.findOne({
      where: { id },
    });

    brunch.filialCaption = brunch.filial.caption;
    return brunch;
  };

  deleteBrunch = async function (id: number): Promise<Boolean> {
    await this.filialRepository.destroy({
      where: { id },
    });
    return true;
  };
}
