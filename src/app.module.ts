import { NotificationModule } from './modules/notification-module/notification.module';
import { UserModule } from './modules/user-module/user.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostGresModule } from './database/postgres/postgres.module';
import { StudyServiceModule } from './modules/study-service-module/study-service.module';
import { AchievementServiceModule } from './modules/achievement-service-module/achievement-service.module';
import { UploadFileModule } from './modules/upload-file-module/upload-file.module';
import { FollowModule } from './modules/follow-module/follow.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    NotificationModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    PostGresModule,
    StudyServiceModule,
    AchievementServiceModule,
    UploadFileModule,
    FollowModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
