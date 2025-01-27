import { IsNotEmpty } from "class-validator";

export class UpdateProgressLessonDTO {
    @IsNotEmpty()
    course_id : number;

    @IsNotEmpty()
    lesson_id? : number;

    user_id? : string;

    score? : number;
}