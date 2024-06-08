import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Follower } from "src/database/entities/follower.entity";
import { Equal, Repository } from "typeorm";
import { FollowImpl } from "./follow.impl";

@Injectable()
export class FollowRepository extends Repository<Follower> implements FollowImpl {
    constructor(
        @InjectRepository(Follower) followRepository: Repository<Follower>
    ) {
        super(followRepository.target, followRepository.manager, followRepository.queryRunner);
    }

    async getFollowers(userId: string) {
        return await this.createQueryBuilder('follower')
            .select('follower.follower as follower , follower.following as following')
            .addSelect('user.user_name as userName, user.first_name as firstName , user.last_name as lastName , user.avatar as avatar')
            .innerJoin('user', 'user', 'user.id = follower.follower')
            .where("follower.following = '" + userId + "'")
            .getRawMany();
    }

    async getFollowings(userId: string) {
        return await this.createQueryBuilder('follower')
            .select('follower.follower as follower , follower.following as following')
            .addSelect('user.user_name as userName, user.first_name as firstName , user.last_name as lastName, user.avatar as avatar')
            .innerJoin('user', 'user', 'user.id = follower.following')
            .where("follower.follower = '" + userId + "'")
            .getRawMany();
    }

    async getNumberOfFollowings(followerId: string) {
        return await this.count({
            where: { follower: Equal(followerId) }
        });
    }

    async getNumberOfFollowers(followingId: string) {
        return await this.count({
            where: { following: Equal(followingId) }
        });
    }


    async getPopularUser() {
        return await this.createQueryBuilder("follower")
            .select('follower.following as id, COUNT(follower.follower) as numberoffollowers')
            .addSelect('user.user_name, user.first_name , user.last_name , user.avatar')
            .innerJoin('user', 'user', "user.id = follower.following")
            .groupBy('follower.following')
            .addGroupBy('user.user_name')
            .addGroupBy('user.first_name')
            .addGroupBy('user.last_name')
            .addGroupBy('user.avatar')
            .orderBy("COUNT(follower.follower)","DESC")
            .getRawMany();
    }
}