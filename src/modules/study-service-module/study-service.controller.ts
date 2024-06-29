import { BadRequestException, Body, Controller, Get, NotFoundException, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { CourseInfoService } from "./services/course-info.service";
import { AuthGuard } from "@nestjs/passport";
import { CreateLessonVocabularyDTO } from "src/dtos/create-lessons/createlessonvocabulary.dto";
import { VocabularyService } from "./services/lesson-services/vocabulary.service";
import { CreateCourseDTO } from "src/dtos/createcourse.dto";
import { UpdateProgressLessonDTO } from "src/dtos/updare-progress-lesson/updateprogresslesson.dto";
import { UpdateProgressLessonVocabularyDTO } from "src/dtos/updare-progress-lesson/updateprogresslessonvocabulary.dto";
import { UpdateCourseInfoDTO } from "src/dtos/update_course_info.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { LessonService } from "./services/lesson-services/lesson.service";
import { CreateLessonTestDTO } from "src/dtos/create-lessons/createlessontest.dto";
import { TestService } from "./services/lesson-services/test.service";
import { CacheInterceptor, CacheKey, CacheTTL } from "@nestjs/cache-manager";

@Controller('/study')
export class StudyServiceController {

    constructor(
        private readonly courseInfoService: CourseInfoService,
        private readonly vocabularyService: VocabularyService,
        private readonly lessonService: LessonService,
        private readonly testService: TestService
    ) { }

    /**
     * study/course/
     *  
     */
    @Post('/course')
    @UseGuards(AuthGuard('jwt'))
    createCourse(@Body() createCourse: CreateCourseDTO, @Req() req) {
        return this.courseInfoService.createCourse(createCourse, req.user.userId);
    }

    @Get('/course/info/')
    @UseGuards(AuthGuard('jwt'))
    getCourseInfo(@Query('course_id') courseId: number, @Req() req) {
        return this.courseInfoService.getCourseInfo(courseId, req.user.userId);
    }

    @Get('/course/popular')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(CacheInterceptor)
    @CacheKey('popular_courses')
    @CacheTTL(3600) // TTL (Time to Live) là 60 giây
    getPopularCourse(@Req() req) {
        return this.courseInfoService.getPopularCourse(req.user.userId);
    }

    @Get('/course/learning')
    @UseGuards(AuthGuard('jwt'))
    getLearningCourse(@Req() req) {
        return this.courseInfoService.getLearningCourse(req.user.userId);
    }

    @Get('/course/teaching')
    @UseGuards(AuthGuard('jwt'))
    getTeachingCourse(@Req() req) {
        return this.courseInfoService.getTeachingCourse(req.user.userId);
    }

    @Get('/course/recent-course')
    @UseGuards(AuthGuard('jwt'))
    getRecentCourse(@Req() req, @Query('limit') limit: number) {
        return this.courseInfoService.getRecentCourse(req.user.userId, limit)
    }


    @Post('/course/add-lesson-vocabulary')
    @UseGuards(AuthGuard('jwt'))
    async createLesson(@Body() createLesson: CreateLessonVocabularyDTO, @Req() req) {
        createLesson.authorId = req.user.userId;
        return await this.vocabularyService.createLessonVocabulary(createLesson);
    }

    @Post('/course/add-lesson-test')
    @UseGuards(AuthGuard('jwt'))
    async createLessonTest(@Body() createLesson: CreateLessonTestDTO, @Req() req) {
        createLesson.authorId = req.user.userId;
        console.log("DATAAA : ", createLesson);
        return await this.testService.createLessonTest(createLesson);
    }

    @Get('/course/lesson')
    @UseGuards(AuthGuard('jwt'))
    getVocabularyLesson(@Req() req, @Query('lesson_id') lessonId) {
        return this.lessonService.getLesson(lessonId, req.user.userId);
    }

    @Post('/course/join')
    @UseGuards(AuthGuard('jwt'))
    joinCourse(@Req() req, @Body() body: { courseId: number }) {
        return this.courseInfoService.joinCourse(body.courseId, req.user.userId);
    }

    @Post('/course/update-progress/vocabulary-lesson')
    @UseGuards(AuthGuard('jwt'))
    updateProgress(@Req() req, @Body() updateProgress: UpdateProgressLessonVocabularyDTO) {
        updateProgress.user_id = req.user.userId;
        return this.vocabularyService.updateProgressVocabularyLesson(updateProgress);
    }

    @Put('/course')
    @UseGuards(AuthGuard('jwt'))
    async updateCourseInfo(@Req() req, @Body() updateCourse: UpdateCourseInfoDTO) {
        const response = await this.courseInfoService.updateCourse(req.user.userId, updateCourse);
        if (response.statusCode == 200) {
            return response.message;
        } else {
            throw new BadRequestException(response);
        }
    }

    @Post('course/avatar')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads/courses',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = extname(file.originalname);
                callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            }
        })
    }))
    async uploadCourseAvatar(@UploadedFile() file: Express.Multer.File, @Req() req, @Query('course_id') courseId: number) {
        console.log("USERID : ", req.user.userId);
        console.log("COURSEID : ", courseId);
        const response = await this.courseInfoService.uploadAvatarCourse(req.user.userId, courseId, file);
        if (response.statusCode == 400) {
            throw new BadRequestException();
        }
        if (response.statusCode == 404) {
            throw new NotFoundException();
        }

        return response;
    }
}