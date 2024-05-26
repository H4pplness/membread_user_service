import { Inject, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { CreateCourseDTO } from "src/dtos/createcourse.dto";

export class CourseInfoService implements OnModuleInit{
    constructor(@Inject('STUDY_SERVICE') private readonly kafkaClient : ClientKafka){}

    async onModuleInit() {
        this.kafkaClient.subscribeToResponseOf('get-course-info');
        this.kafkaClient.subscribeToResponseOf('learning-courses');
        this.kafkaClient.subscribeToResponseOf('teaching-courses');
        this.kafkaClient.subscribeToResponseOf('create-course');
        this.kafkaClient.subscribeToResponseOf('popular-courses');
        this.kafkaClient.subscribeToResponseOf('join-course');
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

    async getPopularCourse() {
        return await lastValueFrom(this.kafkaClient.send('popular-courses',{}));
    }

    async joinCourse(courseId: number, userId: string) {
        console.log("USER ID :",userId);
        return await lastValueFrom(this.kafkaClient.send('join-course',{participant_id : userId,course_id : courseId}));
    }
    
}