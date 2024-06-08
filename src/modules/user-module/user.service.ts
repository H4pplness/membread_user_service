import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { HonorService } from "../achievement-service-module/services/honor.service";
import { ScoreService } from "../achievement-service-module/services/score.service";
import { UpdateUserInfoDTO } from "src/dtos/user/updateuserinfo.dto";
import { FollowService } from "../follow-module/services/follow.service";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly honorService: HonorService,
        private readonly scoreService: ScoreService,
        private readonly followService: FollowService
    ) { }
    async getInfo(userId: string) {
        const [userInfo, totalScore, honors, numberOfFollowings, numberOfFollowers] = await Promise.all([
            this.userRepository.findOne({
                select: {
                    "firstName": true,
                    "lastName": true,
                    "avatar": true,
                    "id": true,
                    "userName": true
                },
                where: {
                    id: userId
                }
            }),
            this.scoreService.getTotalScore(userId),
            this.honorService.getHonor(userId),
            this.followService.getNumberOfFollowings(userId),
            this.followService.getNumberOfFollowers(userId),
        ])

        const combineInfo = { ...userInfo, totalScore, honors, numberOfFollowers, numberOfFollowings };
        return combineInfo;
    }

    async getLoginedUser(userId: string) {
        const [userInfo, totalScore, honors, numberOfFollowings, numberOfFollowers] = await Promise.all([
            this.userRepository.findOne({
                select: {
                    "firstName": true,
                    "lastName": true,
                    "avatar": true,
                    "email": true,
                    "id": true,
                    "userName": true
                },
                where: {
                    id: userId
                }
            }),
            this.scoreService.getTotalScore(userId),
            this.honorService.getHonor(userId),
            this.followService.getNumberOfFollowings(userId),
            this.followService.getNumberOfFollowers(userId)
        ])

        const combineInfo = {
            ...userInfo,
            totalScore,
            honors,
            numberOfFollowers,
            numberOfFollowings
        };
        return combineInfo;
    }


    async updateUserInfo(userId: string, updateUserInfo: UpdateUserInfoDTO) {
        const updateData: any = {};

        if (updateUserInfo.firstName !== undefined && updateUserInfo !== null) {
            updateData.firstName = updateUserInfo.firstName;
        }

        if (updateUserInfo.lastName !== undefined && updateUserInfo.lastName !== null) {
            updateData.lastName = updateUserInfo.lastName;
        }

        if (updateUserInfo.userName !== undefined && updateUserInfo.userName !== null) {
            updateData.userName = updateUserInfo.userName;
        }
        if (Object.keys(updateData).length > 0) {
            try {
                await this.userRepository.update(userId, updateData);
                console.log(`User ${userId} updated successfully.`);
                return { "message": "updated success" };
            } catch (error) {
                console.error(`Failed to update user ${userId}:`, error);
                // Bạn có thể ném lỗi hoặc trả về thông báo lỗi cho phía client ở đây
                throw new Error(`Could not update user ${userId}`);
            }
        } else {
            console.log(`No fields to update for user ${userId}`);
        }
    }

}