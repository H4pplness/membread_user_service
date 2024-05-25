import { UpdateProgressLessonDTO } from "./updateprogresslesson.dto";

export class UpdateProgressLessonVocabularyDTO extends UpdateProgressLessonDTO{
    listVocabulary : {learning_id : number ,progress : number}[];
}