import { IsNotEmpty } from "@nestjs/class-validator";

export class SendingNotificationDTO {
    @IsNotEmpty({message : "missing token"})
    token : string;

    @IsNotEmpty({message : "missing title"})
    title : string;

    @IsNotEmpty({message : 'missing description'})
    description : string;

    @IsNotEmpty()
    time : string; // 'HH:mm'

    courseId? : number;

    eachSunday? : boolean;
    eachMonday? : boolean;
    eachTuesday ? : boolean;
    eachWednesday ? : boolean;
    eachThursday ? : boolean;
    eachFriday ? : boolean;
    eachSaturday ? : boolean;

    scheduledDate ? : Date;
}