import { CourseService } from 'src/app/service/course/course.service';
import { Component, OnInit } from '@angular/core';
import { ProfessorService } from 'src/app/service/professor/professor.service';
import { QuestionService } from 'src/app/service/question/question.service';
import { EnadeService } from 'src/app/service/enade/enade.service';
import { StudentService } from 'src/app/service/student/student.service';
import { EnadePorcentagemDTO } from 'src/app/interfaces/EnadePorcentagemDTO';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  course: string = '0';
  professor: string = '0';
  question: string = '0';
  enade: string = '0';
  student: string = '0';
  enadePorcentagemDTO!: EnadePorcentagemDTO;

  constructor(
    private courseService: CourseService,
    private professorService: ProfessorService,
    private questionService: QuestionService,
    private enadeService: EnadeService,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.courseService.getCourseData().subscribe(data => {
      this.course = data;
    })
    this.professorService.getProfessorData().subscribe(data => {
      this.professor = data;
    })
    this.questionService.getQuestionData().subscribe(data => {
      this.question = data;
    })
    this.enadeService.getEnadeData().subscribe(data => {
      this.enade = data;
    })
    this.enadeService.getEnadePorcentagem().subscribe(data => {
      this.enadePorcentagemDTO = data;
    })
    this.studentService.getStudentData().subscribe(data => {
      this.student = data;
    })
  }

}
