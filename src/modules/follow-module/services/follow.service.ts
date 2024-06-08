import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { FollowRepository } from "../repositories/follow.repository";
import { Follower } from "src/database/entities/follower.entity";
import { User } from "src/database/entities/user.entity";

@Injectable()
export class FollowService {
    constructor(private readonly followRepository: FollowRepository) { }

    async getFollowerByFollowingId(userId: string) {
        return await this.followRepository.getFollowers(userId);
    }

    async getFollowingByFollowerId(userId: string) {
        return await this.followRepository.getFollowings(userId);
    }

    async getNumberOfFollowings(userId: string) {
        return await this.followRepository.getNumberOfFollowings(userId);
    }

    async getNumberOfFollowers(userId: string) {
        return await this.followRepository.getNumberOfFollowers(userId);
    }

    async follow(userId: string, following: string) {
        const [user,followingUser] = await Promise.all([
            User.findOne({where:{id : userId}}),
            User.findOne({where:{id : following}}),
        ])

        if(user==null||followingUser == null){
            throw new NotFoundException("User not found !");
        }

        var follower = await this.followRepository.findOne({
            where: {
                follower: userId,
                following: following
            },
            withDeleted: true
        });

        if (follower) {
            if (follower.deleteAt != null) {
                await this.followRepository.restore(follower.id);
                return {
                    "message": "follow"
                };
            } else {
                await this.followRepository.softDelete(follower.id);
                return {
                    "message": "unfollow"
                };
            }
        } else {
            const newFollower = new Follower();
            newFollower.follower = userId;
            newFollower.following = following;
            await newFollower.save();
            return {
                "message": "follow"
            };
        }
    }

    async checkFollow(userId: string, followId: string) {
        const follower = await this.followRepository.findOne({
            where: {
                follower: userId,
                following: followId
            }
        })

        if (follower) return true;
        return false;
    }

    async getPopularUser(){
        return await this.followRepository.getPopularUser();
    }
}