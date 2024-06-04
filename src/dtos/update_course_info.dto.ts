import { IsNotEmpty } from "class-validator";

export class UpdateCourseInfoDTO {
    @IsNotEmpty()
    courseId : number;

    title? : string;

    description? : string;
}