import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthModule } from "src/auth/auth.module";
import { AchievementServiceController } from "./achievement-service.controller";
import { HonorService } from "./services/honor.service";
import { ScoreService } from "./services/score.service";

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
        AuthModule
    ],
    controllers : [AchievementServiceController],
    providers : [HonorService,ScoreService],
    exports : [HonorService,ScoreService]
})
export class AchievementServiceModule{}