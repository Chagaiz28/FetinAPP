import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/configuration';
import { MongoModule } from './providers/database/mongo.module';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from './resources/users/users.module';
import { AuthModule } from './providers/auth/auth.module';
import { JwtAuthGuard } from './providers/auth/guards/jwt-auth.guard';
import { TeamsModule } from './resources/teams/teams.module';
import { RolesGuard } from './common/roles/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
    }),

    MongoModule,

    AuthModule,

    UsersModule,
    TeamsModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
