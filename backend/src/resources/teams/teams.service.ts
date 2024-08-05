import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team } from 'src/schemas/team.schema';
import { CreateTeamDto } from './dto/create.dto';
import { UpdateTeamDto } from './dto/update.dto';
import { UsersService } from '../users/users.service';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name) private teamModel: Model<Team>,
    private readonly usersService: UsersService,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    const teamAlreadyExists = await this.teamModel.findOne({
      number: createTeamDto.number,
    });

    if (teamAlreadyExists) {
      throw new BadRequestException('Team already exists');
    }

    await this.usersService.create({
      name: createTeamDto.advisorName,
      email: createTeamDto.advisorEmail,
      role: Role.Advisor,
    });

    createTeamDto.members.map(async (member) => {
      await this.usersService.create({
        ...member,
        role: Role.Student,
        teamNumber: createTeamDto.number,
      });
    });

    const response = await this.teamModel.create(createTeamDto);

    return response;
  }

  async update(teamId: string, updateTeamDto: UpdateTeamDto) {
    return await this.teamModel.findOneAndUpdate(
      { _id: teamId },
      { $set: updateTeamDto },
      {
        new: true,
      },
    );
  }

  async delete(teamId: string) {
    return await this.teamModel.findOneAndDelete({ _id: teamId });
  }

  async findOne(filter: any) {
    return await this.teamModel.findOne(filter);
  }

  async findStudentTeam(studentEmail: string) {
    return await this.teamModel
      .findOne({ 'members.email': studentEmail })
      .lean();
  }

  async findAllAdvisorTeams(advisorEmail: string) {
    return await this.teamModel.find({ advisorEmail });
  }

  async findAll() {
    return await this.teamModel.find();
  }
}
