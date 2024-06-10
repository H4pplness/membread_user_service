
import { TestDTO } from "../test-lesson/test.dto";
import { CreateLessonDTO } from "./createlesson.dto";

export class CreateLessonTestDTO extends CreateLessonDTO{
    listQuestion? : TestDTO[];
}