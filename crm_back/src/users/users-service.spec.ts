import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from '../roles/roles.model';
import { Identity } from './identity-model';

describe('UsersService', () => {
  let service: UsersService;
  let identityRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          dialect: 'postgres',
          storage: ':memory:',
          models: [User, Role, Identity],
        }),
        SequelizeModule.forFeature([User, Role, Identity]),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    identityRepository = module.get('IdentityRepository');
  });

  it('should return a list of employers with their roles', async () => {
    const user = new User();
    user.accountId = 1;
    const roles = [new Role(), new Role()];
    const employers = [{ user, roles }];

    jest.spyOn(identityRepository, 'findAll').mockResolvedValue(employers);

    const result = await service.getEmployersList(user);
    expect(result).toEqual(employers);
  });

  it('should filter out roles with value "user"', async () => {
    const user = new User();
    user.accountId = 1;
    const roles = [new Role(), { value: 'user' }];
    const employers = [{ user, roles }];

    jest.spyOn(identityRepository, 'findAll').mockResolvedValue(employers);

    const result = await service.getEmployersList(user);
    expect(result[0].roles).not.toContainEqual({ value: 'user' });
  });

  it('should throw an error when the user is null or undefined', async () => {
    await expect(service.getEmployersList(null)).rejects.toThrow();
    await expect(service.getEmployersList(undefined)).rejects.toThrow();
  });

  it('should return an empty list when there are no employers', async () => {
    jest.spyOn(identityRepository, 'findAll').mockResolvedValue([]);

    const result = await service.getEmployersList(new User());
    expect(result).toEqual([]);
  });
});
