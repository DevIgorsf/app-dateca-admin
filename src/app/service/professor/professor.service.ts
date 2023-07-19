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
    this.http.post<Professor>(`${API}/professor`,professor).subscribe (novoProfessor => {

    });
  }

  getAll(): void {
    this.http.get<Professor[]>(`${API}/professor`).subscribe(professor =>{
      console.log(professor)
    })
  }
}
