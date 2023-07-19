import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Professor } from 'src/app/interfaces/professor';
import { ProfessorService } from 'src/app/service/professor/professor.service';

@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
  styleUrls: ['./professors.component.scss']
})
export class ProfessorsComponent implements OnInit {
  professors: Professor[] = [];
  professorsSubscription: Subscription = new Subscription;

  constructor(
    private service: ProfessorService,
  ) { }

  ngOnInit(): void {
    this.service.getAll()
    this.professorsSubscription = this.service.professors$.subscribe(professors => {
      this.professors = professors;
    })
  }

}
