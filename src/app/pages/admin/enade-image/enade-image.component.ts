import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { EnadeWithImage } from 'src/app/interfaces/EnadeWithImage';
import { EnadeService } from 'src/app/service/enade/enade.service';

@Component({
  selector: 'app-enade-image',
  templateUrl: './enade-image.component.html',
  styleUrls: ['./enade-image.component.scss']
})
export class EnadeImageComponent {
  enadeWithImage: EnadeWithImage[] = [];
  enadeWithImageSubscription: Subscription = new Subscription;

  public dataSource!: MatTableDataSource<EnadeWithImage>;
  public displayedColumns:string[] = ['year', 'statement', 'pointsEnum', 'acoes'];
  public pageSize=1;
  public length=5;

  constructor(
    private service: EnadeService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.service.getAllEnadeWithImage()
    this.enadeWithImageSubscription = this.service.enadeWithImage$.subscribe(enades => {
      this.dataSource = new MatTableDataSource<EnadeWithImage>(enades);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })

  }

  deleteEnade(enadeId: number): void {
    if (enadeId) {
      this.service.deleteEnade(enadeId);
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
