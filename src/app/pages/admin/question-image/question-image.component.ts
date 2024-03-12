import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { QuestionMultipleChoiceWithImage } from 'src/app/interfaces/QuestionMultipleChoiceWithImage';
import { QuestionService } from 'src/app/service/question/question.service';

@Component({
  selector: 'app-question-image',
  templateUrl: './question-image.component.html',
  styleUrls: ['./question-image.component.scss']
})
export class QuestionImageComponent {
  questions: QuestionMultipleChoiceWithImage[] = [];
  questionsWithImageSubject: Subscription = new Subscription;

  public dataSource!: MatTableDataSource<QuestionMultipleChoiceWithImage>;
  public displayedColumns:string[] = ['id', 'statement', 'pointsEnum', 'acoes'];
  public pageSize=1;
  public length=5;

  constructor(
    private service: QuestionService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.service.getAllImages()
    this.questionsWithImageSubject = this.service.questionsWithImage$.subscribe(questions => {
      this.dataSource = new MatTableDataSource<QuestionMultipleChoiceWithImage>(questions);
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
