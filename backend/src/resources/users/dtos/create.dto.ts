import { ApiProperty } from '@nestjs/swagger';

import { Role } from 'src/common/enums/role.enum';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: Role })
  role: Role;

  @ApiProperty()
  teamNumber?: string;
}
