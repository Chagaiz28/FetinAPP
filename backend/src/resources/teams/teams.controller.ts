import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create.dto';
import { TeamsService } from './teams.service';
import { UpdateTeamDto } from './dto/update.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @Post()
  async create(@Body() createTeamDto: CreateTeamDto) {
    return await this.teamsService.create(createTeamDto);
  }

  @Patch(':id')
  async update(
    @Body() updateTeamDto: UpdateTeamDto,
    @Param('id') teamId: string,
  ) {
    return await this.teamsService.update(teamId, updateTeamDto);
  }

  @Delete(':id')
  async delete(@Param('id') teamId: string) {
    return await this.teamsService.delete(teamId);
  }

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id')
  async findOne(@Query('id') teamId: string) {
    return await this.teamsService.findOne({ number: teamId });
  }

  @Get('student/:studentEmail')
  async findTeamOfStudentByEmail(@Param('studentEmail') studentEmail: string) {
    return await this.teamsService.findStudentTeam(studentEmail);
  }

  @Get('advisor/:advisorEmail')
  async findByAdvisorEmail(@Param('advisorEmail') advisorEmail: string) {
    return await this.teamsService.findAllAdvisorTeams(advisorEmail);
  }
}
