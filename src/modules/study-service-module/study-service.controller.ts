import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { CourseInfoService } from "./services/course-info.service";
import { AuthGuard } from "@nestjs/passport";
import { CreateLessonVocabularyDTO } from "src/dtos/create-lessons/createlessonvocabulary.dto";
import { VocabularyService } from "./services/lesson-services/vocabulary.service";
import { CreateCourseDTO } from "src/dtos/createcourse.dto";

@Controller('/study')
export class StudyServiceController {

    constructor(
        private readonly courseInfoService : CourseInfoService,
        private readonly vocabularyService : VocabularyService
    ){}

    /**
     * study/course/
     *  
     */
    @Post('/course')
    @UseGuards(AuthGuard('jwt'))
    createCourse(@Body() createCourse : CreateCourseDTO,@Req() req)
    {
        return this.courseInfoService.createCourse(createCourse,req.user.userId);
    }

    @Get('/course/info/')
    @UseGuards(AuthGuard('jwt'))
    getCourseInfo(@Query('course_id') courseId : number ,@Req() req){
        return this.courseInfoService.getCourseInfo(courseId,req.user.userId);
    }

    @Get('/course/learning')
    @UseGuards(AuthGuard('jwt'))
    getLearningCourse(@Req() req){
        return this.courseInfoService.getLearningCourse(req.user.userId);
    }

    @Get('/course/teaching')
    @UseGuards(AuthGuard('jwt'))
    getTeachingCourse(@Req() req){
        return this.courseInfoService.getTeachingCourse(req.user.userId);
    }


    // @Get('learn/lesson')
    // @UseGuards(AuthGuard('jwt'))
    // learnLesson(@Query('lesson_id') lessonId : number){
    //     return this.
    // }

    @Post('/course/add-lesson-vocabulary')
    @UseGuards(AuthGuard('jwt'))
    createLesson(@Body() createLesson : CreateLessonVocabularyDTO){
        return this.vocabularyService.createLessonVocabulary(createLesson);
    }

    @Get('/course/vocabulary-lesson')
    @UseGuards(AuthGuard('jwt'))
    getVocabularyLesson(@Req() req,@Query('lesson_id') lessonId)
    {
        return this.vocabularyService.getLessonVocabulary(lessonId,req.user.userId);
    }
}