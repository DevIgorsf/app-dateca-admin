import { CourseService } from 'src/app/service/course/course.service';
import { Component, OnInit } from '@angular/core';
import { ProfessorService } from 'src/app/service/professor/professor.service';
import { QuestionService } from 'src/app/service/question/question.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  course: string = '0';
  professor: string = '0';

  constructor(
    private courseService: CourseService,
    private professorService: ProfessorService,
    private questionService: QuestionService
  ) { }

  ngOnInit(): void {
    this.courseService.getCourseData().subscribe(data => {
      this.course = data;
    })
    this.professorService.getProfessorData().subscribe(data => {
      this.professor = data;
    })
  }

}
