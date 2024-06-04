import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { CreateCourseDTO } from "src/dtos/createcourse.dto";
import { UpdateCourseInfoDTO } from "src/dtos/update_course_info.dto";
import { UploadCourseAvatarDTO } from "src/dtos/uploadcourseavatar.dto";
import { UploadFileService } from "src/modules/upload-file-module/upload-file.service";

@Injectable()
export class CourseInfoService implements OnModuleInit{
    constructor(
        @Inject('STUDY_SERVICE') private readonly kafkaClient : ClientKafka,
        private readonly uploadFileService : UploadFileService
    ){}

    async onModuleInit() {
        this.kafkaClient.subscribeToResponseOf('get-course-info');
        this.kafkaClient.subscribeToResponseOf('learning-courses');
        this.kafkaClient.subscribeToResponseOf('teaching-courses');
        this.kafkaClient.subscribeToResponseOf('create-course');
        this.kafkaClient.subscribeToResponseOf('popular-courses');
        this.kafkaClient.subscribeToResponseOf('join-course');
        this.kafkaClient.subscribeToResponseOf('get-recent-course');
        this.kafkaClient.subscribeToResponseOf('update-course');
        this.kafkaClient.subscribeToResponseOf('upload-course-avatar');
        await this.kafkaClient.connect();
    }

    async getCourseInfo(courseId : number,userId : string){
        return await lastValueFrom(this.kafkaClient.send('get-course-info',{courseId,userId}));
    }

    async getLearningCourse(userId : string){
        return await lastValueFrom(this.kafkaClient.send('learning-courses',{userId}));
    }

    async getTeachingCourse(userId : string){
        return await lastValueFrom(this.kafkaClient.send('teaching-courses',{userId}));
    }

    async createCourse(createCourse : CreateCourseDTO,userId : string){
        return await lastValueFrom(this.kafkaClient.send('create-course',{createCourse,userId}));
    }

    async getPopularCourse(userId : string) {
        return await lastValueFrom(this.kafkaClient.send('popular-courses',{userId}));
    }

    async joinCourse(courseId: number, userId: string) {
        console.log("USER ID :",userId);
        return await lastValueFrom(this.kafkaClient.send('join-course',{participant_id : userId,course_id : courseId}));
    }

    async getRecentCourse(userId: string, limit: number) {
        return await lastValueFrom(this.kafkaClient.send('get-recent-course',{userId,limit}));
    }

    async updateCourse(userId : string , updateCourse : UpdateCourseInfoDTO){
        return await lastValueFrom(this.kafkaClient.send('update-course',{userId,updateCourse}));
    }

    async uploadAvatarCourse(userId : string , courseId : number ,file : Express.Multer.File){
        const uploadAvatar = await this.uploadFileService.uploadAvatarOfCourse(userId,courseId,file);
        return await lastValueFrom(this.kafkaClient.send('upload-course-avatar',uploadAvatar));
    }
    
}