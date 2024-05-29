import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { CourseInfoService } from "./services/course-info.service";
import { AuthGuard } from "@nestjs/passport";
import { CreateLessonVocabularyDTO } from "src/dtos/create-lessons/createlessonvocabulary.dto";
import { VocabularyService } from "./services/lesson-services/vocabulary.service";
import { CreateCourseDTO } from "src/dtos/createcourse.dto";
import { UpdateProgressLessonDTO } from "src/dtos/updare-progress-lesson/updateprogresslesson.dto";
import { UpdateProgressLessonVocabularyDTO } from "src/dtos/updare-progress-lesson/updateprogresslessonvocabulary.dto";

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

    @Get('/course/popular')
    getPopularCourse(){
        return this.courseInfoService.getPopularCourse();
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
    async createLesson(@Body() createLesson : CreateLessonVocabularyDTO,@Req() req){
        createLesson.authorId = req.user.userId;
        return await this.vocabularyService.createLessonVocabulary(createLesson);
    }

    @Get('/course/vocabulary-lesson')
    @UseGuards(AuthGuard('jwt'))
    getVocabularyLesson(@Req() req,@Query('lesson_id') lessonId)
    {
        return this.vocabularyService.getLessonVocabulary(lessonId,req.user.userId);
    }

    @Get('/course/join')
    @UseGuards(AuthGuard('jwt'))
    joinCourse(@Req() req, @Query('course_id') courseId)
    {
        console.log(req.user);
        return this.courseInfoService.joinCourse(courseId,req.user.userId);
    }

    @Post('/course/update-progress/vocabulary-lesson')
    @UseGuards(AuthGuard('jwt'))
    updateProgress(@Req() req , @Body() updateProgress : UpdateProgressLessonVocabularyDTO){
        updateProgress.user_id = req.user.userId;
        return this.vocabularyService.updateProgressVocabularyLesson(updateProgress);
    }
}