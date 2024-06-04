import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { UploadFileController } from "./upload-file.controller";
import { UploadFileService } from "./upload-file.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports : [TypeOrmModule.forFeature([User]),AuthModule],
    providers : [UploadFileService],
    controllers : [UploadFileController],
    exports : [UploadFileService]
})
export class UploadFileModule {

}