import { Course } from "./course";
import { PointsEnum } from "./pointsEnum";
import { Professor } from "./professor";
import { QuestionAlternative } from "./questionAlternative";
import { QuestionTypeEnum } from "./questionTypeEnum";

export interface QuestionMultipleChoice {
  id: number;
  name: string;
  statement: string;
  pointsEnum: PointsEnum;
  questionTypeEnum?: QuestionTypeEnum;
  course: Course;
  professorCreate: Professor;
  choices: QuestionAlternative[];
}
