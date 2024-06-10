import { TestDTO } from "./test.dto";

class Choice {
    content? : string;
    isCorrect? : boolean;
}

export class ChooseTestDTO extends TestDTO{
    id? : number;
    
    question? : string;
    
    choice1? : Choice;
    choice2? : Choice;
    choice3? : Choice;
    choice4? : Choice;
}