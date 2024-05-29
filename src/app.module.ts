import { UserModule } from './modules/user-module/user.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PostGresModule } from './database/postgres/postgres.module';
import { StudyServiceModule } from './modules/study-service-module/study-service.module';
import { AchievementServiceModule } from './modules/achievement-service-module/achievement-service.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    PostGresModule,
    StudyServiceModule,
    AchievementServiceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
