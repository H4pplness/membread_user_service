import { IsNotEmpty, IsNumber, IsString } from "@nestjs/class-validator";


export class CreateCourseDTO {
    @IsNotEmpty({message : 'Please enter title'})
    @IsString()
    title : string;

    @IsString()
    description : string;
} 