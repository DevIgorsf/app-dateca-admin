import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Enade } from 'src/app/interfaces/Enade';
import { EnadeWithImage } from 'src/app/interfaces/EnadeWithImage';
import { environment } from 'src/environments/environment';

const API = environment.ApiUrl;

@Injectable({
  providedIn: 'root'
})
export class EnadeService {
  private enadeSubject = new BehaviorSubject<Enade[]>([]);
  enade$ = this.enadeSubject.asObservable();
  private enadeWithImageSubject = new BehaviorSubject<EnadeWithImage[]>([]);
  enadeWithImage$ = this.enadeWithImageSubject.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getEnade(questionId: number): Observable<Enade> {
    return this.http.get<Enade>(`${API}/questao/${questionId}`);
  }

  getEnadeWithImage(questionId: number): Observable<EnadeWithImage> {
    return this.http.get<EnadeWithImage>(`${API}/questao/${questionId}`);
  }

  getAllEnade(): void {
    this.http.get<Enade[]>(`${API}/questao`).subscribe(questions => {
      this.enadeSubject.next(questions);
    })
  }

  getAllEnadeWithImage(): void {
    this.http.get<EnadeWithImage[]>(`${API}/questao`).subscribe(questions => {
      this.enadeWithImageSubject.next(questions);
    })
  }

  saveImages(files: FileList, newQuestion: any) {
    const formData = new FormData();

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('imageFile', files[i]);
      }
    }

    if (Array.isArray(newQuestion)) {
      newQuestion.forEach(question => {
        Object.keys(question).forEach(key => {
          if(question[key] != '') {
            formData.append(key, question[key]);
          }
        });
      });
    } else {
      Object.keys(newQuestion).forEach(key => {
        if(newQuestion[key] != '') {
          formData.append(key, newQuestion[key]);
        }
      });
    }

    this.http.post<EnadeWithImage>(`${API}/questao/imagens`, formData).subscribe(newQuestion => {
      let questionTemp: EnadeWithImage[] = this.enadeWithImageSubject.getValue();
      questionTemp = [...questionTemp, newQuestion];
      this.enadeSubject.next(questionTemp);
    });
    
  }

  getImages(imageId: string): any {
    throw new Error('Method not implemented.');
  }

  createEnade(question: any): void {
    this.http.post<Enade>(`${API}/questao`, question).
    pipe(
      tap(newQuestion => {
        this.enadeSubject.next([...this.enadeSubject.getValue(), newQuestion]);
      }),
      catchError(error => {
        console.error('Erro ao criar pergunta:', error);

        return throwError(error);
      })
    );
  }
}
