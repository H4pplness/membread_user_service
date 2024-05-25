
import { Grammar } from "../learnings/grammar.dto";
import { CreateLessonDTO } from "./createlesson.dto";

export class CreateLessonGrammarDTO extends CreateLessonDTO{
    grammar : Grammar;
}