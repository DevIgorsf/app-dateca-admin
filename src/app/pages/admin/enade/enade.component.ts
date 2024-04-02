import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Enade } from 'src/app/interfaces/Enade';
import { EnadeService } from 'src/app/service/enade/enade.service';
import { QuestionService } from 'src/app/service/question/question.service';

@Component({
  selector: 'app-enade',
  templateUrl: './enade.component.html',
  styleUrls: ['./enade.component.scss']
})
export class EnadeComponent {
  enades: Enade[] = [];
  enadesSubscription: Subscription = new Subscription;

  public dataSource!: MatTableDataSource<Enade>;
  public displayedColumns:string[] = ['id', 'statement', 'pointsEnum', 'acoes'];
  public pageSize=1;
  public length=5;

  constructor(
    private service: EnadeService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.service.getAllEnade()
    this.enadesSubscription = this.service.enade$.subscribe(enades => {
      this.dataSource = new MatTableDataSource<Enade>(enades);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })

  }

  deleteEnade(courseId: number): void {
    if (courseId) {
      this.service.deleteEnade(courseId);
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

