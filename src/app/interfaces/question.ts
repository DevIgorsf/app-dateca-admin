import { Professor } from "./professor";

export interface Question {
  id: number;
  name: string;
  pointsEnum: number;
  questionTypeEnum: string;
  professorCreate: Professor;
}
