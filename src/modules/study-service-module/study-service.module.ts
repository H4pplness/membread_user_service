import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthModule } from "src/auth/auth.module";
import { StudyServiceController } from "./study-service.controller";
import { CourseInfoService } from "./services/course-info.service";
import { VocabularyService } from "./services/lesson-services/vocabulary.service";
import { UploadFileModule } from "../upload-file-module/upload-file.module";

@Module({
    imports : [
        ClientsModule.register(
            [
                {
                    name: 'STUDY_SERVICE',
                    transport: Transport.KAFKA,
                    options: {
                        client: {
                            brokers: ['localhost:9092']
                        },
                        consumer: {
                            groupId: 'study-consumer',
                        },
                    }
                }
            ]
        ),
        AuthModule,
        UploadFileModule
    ],
    providers : [CourseInfoService,VocabularyService],
    controllers : [StudyServiceController]
})
export class StudyServiceModule {

}