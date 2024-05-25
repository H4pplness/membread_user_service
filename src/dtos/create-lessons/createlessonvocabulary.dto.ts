
import { Vocabulary } from "../learnings/vocabulary.dto";
import { CreateLessonDTO } from "./createlesson.dto";

export class CreateLessonVocabularyDTO extends CreateLessonDTO{
    listVocabulary? : Vocabulary[];
}