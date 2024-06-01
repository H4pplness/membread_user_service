import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthModule } from "src/auth/auth.module";
import { AchievementServiceController } from "./achievement-service.controller";
import { HonorService } from "./services/honor.service";
import { ScoreService } from "./services/score.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";

@Module({
    imports:[
        ClientsModule.register(
            [
                {
                    name: 'ACHIEVEMENT_SERVICE',
                    transport: Transport.KAFKA,
                    options: {
                        client: {
                            brokers: ['localhost:9092']
                        },
                        consumer: {
                            groupId: 'achievement-consumer',
                        },
                    }
                }
            ]
        ),
        AuthModule,
        TypeOrmModule.forFeature([User])
    ],
    controllers : [AchievementServiceController],
    providers : [HonorService,ScoreService],
    exports : [HonorService,ScoreService]
})
export class AchievementServiceModule{}