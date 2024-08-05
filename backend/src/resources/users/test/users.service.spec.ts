import { UsersService } from '../users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { BadRequestException } from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

const mockDataBaseService = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockUser = {
  email: 'test@test.com',
  name: 'Test',
  password: '12356',
  role: Role.Student,
};
const mockUserResponse = {
  email: 'test@test.com',
  name: 'Test',
  role: Role.Student,
};

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken(User.name), useValue: mockDataBaseService },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              // this is being super extra, in the case that you need multiple keys with the `get` method
              if (key === 'FOO') {
                return 123;
              }
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    service.findOneByEmail = jest.fn().mockResolvedValue(null);
    model.create = jest.fn().mockResolvedValue(mockUser);
    jest.spyOn(bcrypt, 'hash').mockReturnValue();

    expect(await service.create(mockUser)).toStrictEqual(mockUserResponse);
  });

  it('should not create a user if it already exists', async () => {
    service.findOneByEmail = jest.fn().mockResolvedValue(mockUser);

    try {
      await service.create(mockUser);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
      expect(e.message).toBe('User already exists');
    }
  });

  it('should find a user by email', async () => {
    service.findOneByEmail = jest.fn().mockResolvedValue(mockUser);

    expect(await service.findOneByEmail(mockUser.email)).toBe(mockUser);
  });
});
