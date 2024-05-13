import { IsEmail } from "@nestjs/class-validator";

export class MappingGoogleAccount{
    @IsEmail()
    email : string;

    firstName : string;

    lastName : string;
}