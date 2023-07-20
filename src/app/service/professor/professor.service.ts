import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Professor } from 'src/app/interfaces/professor';
import { BehaviorSubject } from 'rxjs';

const API = environment.ApiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private professorsSubject = new BehaviorSubject<Professor[]>([]);
  professors$ = this.professorsSubject.asObservable();

  constructor(
    private http: HttpClient,
    ) { }

  create(professor: Professor): void {
    this.http.post<Professor>(`${API}/professor`, professor).subscribe(novoProfessor => {
      console.log(novoProfessor);
      let professorTemp: Professor[] = this.professorsSubject.getValue();
      console.log(professorTemp);
      professorTemp = [...professorTemp, novoProfessor];
      this.professorsSubject.next(professorTemp);
    });
  }

  getAll(): void {
    this.http.get<Professor[]>(`${API}/professor`).subscribe(professors =>{
      this.professorsSubject.next(professors);
    })
  }

  deleteProfessor(professorId: number): void {
    this.http.delete<Professor>(`${API}/professor/${professorId}`).subscribe(() => {
      const professors = this.professorsSubject.getValue();
      const professorsResult = professors.filter(t => t.id !== professorId);
      this.professorsSubject.next(professorsResult);
    },
    (error) => {
      const professors = this.professorsSubject.getValue();
      const professorsResult = professors.filter(t => t.id !== professorId);
      this.professorsSubject.next(professorsResult);
    });
  }
}
