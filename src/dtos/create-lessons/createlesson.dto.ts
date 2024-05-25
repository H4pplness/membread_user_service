import { IsNotEmpty } from "class-validator";

export abstract class CreateLessonDTO {
    @IsNotEmpty()
    title : string;

    description? : string;

    authorId : number;

    courseId : number;
}