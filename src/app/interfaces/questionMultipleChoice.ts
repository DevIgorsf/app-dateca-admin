import { PointsEnum } from "./pointsEnum";
import { Professor } from "./professor";
import { QuestionAlternative } from "./questionAlternative";
import { QuestionTypeEnum } from "./questionTypeEnum";

export interface QuestionMultipleChoice {
  id: number;
  name: string;
  pointsEnum: PointsEnum;
  questionTypeEnum: QuestionTypeEnum;
  professorCreate: Professor;
  choices: QuestionAlternative[];
}
