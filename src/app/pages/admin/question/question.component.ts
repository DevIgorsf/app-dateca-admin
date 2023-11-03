import { Component, ViewChild } from '@angular/core';
import { Subscription} from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { CourseService } from 'src/app/service/course/course.service';
import { Course } from 'src/app/interfaces/course';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  courses: Course[] = [];
  professorsSubscription: Subscription = new Subscription;

  public dataSource!: MatTableDataSource<Course>;
  public displayedColumns:string[] = ['#', 'name', 'materia', 'acoes'];
  public pageSize=1;
  public length=5;

  constructor(
    private service: CourseService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.service.getAll()
    this.professorsSubscription = this.service.courses$.subscribe(courses => {
      this.dataSource= new MatTableDataSource<Course>(courses);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })

  }

  deleteCourse(courseId: number): void {
    if (courseId) {
      this.service.deleteCourse(courseId);
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
