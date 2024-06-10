import { TestDTO } from "./test.dto";

export class ShortAnswerTest extends TestDTO{
    id? : number;

    question? : string;

    answers? : string;
}