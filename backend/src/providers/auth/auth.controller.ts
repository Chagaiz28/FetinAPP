import { Req, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RequestWithUser } from 'src/common/types/request';
import { PublicResource } from 'src/common/decorators/public-resource.decorator';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    description: 'User login',
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
  })
  @PublicResource()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(
    @Req() { user }: RequestWithUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { cookie, acessToken } = this.authService.getCookieWithJwtToken(user);
    response.setHeader('Set-Cookie', cookie);
    return { user, acessToken };
  }
}
