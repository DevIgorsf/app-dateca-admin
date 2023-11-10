import { Component, ViewChild } from '@angular/core';
import { Subscription} from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { CourseService } from 'src/app/service/course/course.service';
import { Course } from 'src/app/interfaces/course';
import { QuestionService } from 'src/app/service/question/question.service';
import { Question } from 'src/app/interfaces/question';
import { QuestionMultipleChoice } from 'src/app/interfaces/questionMultipleChoice';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  questions: QuestionMultipleChoice[] = [];
  questionsSubscription: Subscription = new Subscription;

  public dataSource!: MatTableDataSource<QuestionMultipleChoice>;
  public displayedColumns:string[] = ['codigo', 'materia', 'dificuldade', 'acoes'];
  public pageSize=1;
  public length=5;

  constructor(
  private service: QuestionService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.service.getAll()
    this.questionsSubscription = this.service.questions$.subscribe(questions => {
      this.dataSource = new MatTableDataSource<QuestionMultipleChoice>(questions);
      console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })

  }

  deleteQuestion(courseId: number): void {
    if (courseId) {
      this.service.deleteQuestion(courseId);
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
