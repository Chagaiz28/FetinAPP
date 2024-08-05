import { IsNotEmpty } from 'class-validator';

export class memberSubSchema {
  name: string;
  email: string;
}

export class CreateTeamDto {
  @IsNotEmpty({ message: 'O número da equipe não pode ser vazio' })
  number: string;

  @IsNotEmpty({ message: 'O nome da equipe não pode ser vazio' })
  name: string;

  members: memberSubSchema[];

  @IsNotEmpty({ message: 'O nome do orientador não pode ser vazio' })
  advisorName: string;

  @IsNotEmpty({ message: 'O email do orientador não pode ser vazio' })
  advisorEmail: string;

  status: string;

  extraActivities: string[];
}
