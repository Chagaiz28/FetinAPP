import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dtos/create.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,
  ) {}

  async create(user: CreateUserDto) {
    const userAlreadyExists = await this.findOneByEmail(user.email);

    if (userAlreadyExists) {
      return userAlreadyExists;
    }

    const defaultPass = this.configService.get<string>('DEFAULT_PASS');

    const newUser = await this.userModel.create({
      ...user,
      password: await bcrypt.hash(defaultPass, 10),
    });

    delete newUser.password;

    return newUser;
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email }).lean();
  }
}
