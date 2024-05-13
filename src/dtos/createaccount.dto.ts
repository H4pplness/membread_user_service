import { IsEmail, IsNotEmpty } from "@nestjs/class-validator";

export class CreateAccountDTO {
    @IsEmail()
    email : string;

    @IsNotEmpty()
    password : string;

    @IsNotEmpty({message : 'please enter your first name'})
    firstName : string;

    @IsNotEmpty({message : 'please enter your last name'})
    lastName : string;
}