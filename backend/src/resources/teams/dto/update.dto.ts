import { IsOptional } from 'class-validator';
import { Grades } from 'src/schemas/team.schema';

export class UpdateTeamDto {
  @IsOptional()
  name: string;

  @IsOptional()
  advisorName: string;

  @IsOptional()
  advisorEmail: string;

  @IsOptional()
  status: string;

  @IsOptional()
  extraActivities: string[];

  @IsOptional()
  currentPhase: string;

  @IsOptional()
  deadline: string;

  @IsOptional()
  issues: string[];

  @IsOptional()
  grades: Grades[];
}
