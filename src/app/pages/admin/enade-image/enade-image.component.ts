import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { EnadeWithImage } from 'src/app/interfaces/EnadeWithImage';
import { QuestionService } from 'src/app/service/question/question.service';

@Component({
  selector: 'app-enade-image',
  templateUrl: './enade-image.component.html',
  styleUrls: ['./enade-image.component.scss']
})
export class EnadeImageComponent {
  questions: EnadeWithImage[] = [];
  questionsSubscription: Subscription = new Subscription;

  public dataSource!: MatTableDataSource<EnadeWithImage>;
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
    this.service.getAll()
    // this.questionsSubscription = this.service.questions$.subscribe(questions => {
    //   this.dataSource = new MatTableDataSource<EnadeWithImage>(questions);
    //   this.dataSource.sort = this.sort;
    //   this.dataSource.paginator = this.paginator;
    // })

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
