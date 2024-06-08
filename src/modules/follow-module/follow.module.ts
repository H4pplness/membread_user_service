import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Follower } from "src/database/entities/follower.entity";
import { FollowRepository } from "./repositories/follow.repository";
import { FollowController } from "./controllers/follow.controller";
import { FollowService } from "./services/follow.service";
import { AuthModule } from "src/auth/auth.module";
import { User } from "src/database/entities/user.entity";

@Module({
    imports : [TypeOrmModule.forFeature([Follower,User]),AuthModule],
    providers : [FollowRepository,FollowService],
    controllers : [FollowController],
    exports : [FollowService]
})
export class FollowModule{}