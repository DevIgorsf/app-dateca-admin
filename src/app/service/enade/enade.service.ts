import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  getEnade(enadeId: number): Observable<Enade> {
    return this.http.get<Enade>(`${API}/enade/${enadeId}`);
  }

  getEnadeWithImage(enadeId: number): Observable<EnadeWithImage> {
    return this.http.get<EnadeWithImage>(`${API}/enade/imagens/${enadeId}`);
  }

  getAllEnade(): void {
    this.http.get<Enade[]>(`${API}/enade`).subscribe(
      enades => {
        this.enadeSubject.next(enades);
      },
      error => {
        if (error.status === 404) {
          this.toastr.error("Erro 404: Nenhuma questão encontrada.");
        } else {
          this.toastr.error("Erro inesperado:", error);
        }
      }
    );
  }

  getAllEnadeWithImage(): void {
    this.http.get<any[]>(`${API}/enade/images`).subscribe(
      enades => {
        this.enadeWithImageSubject.next(enades);
      },
      error => {
        if (error.status === 404) {
          this.toastr.error("Erro 404: Nenhuma questão encontrada.");
        } else {
          this.toastr.error("Erro inesperado:", error);
        }
      }
    );
  }

  deleteEnade(enadeId: number): void {
    this.http.delete<Enade>(`${API}/enade/${enadeId}`).subscribe(() => {
      const enades = this.enadeSubject.getValue();
      const enadesResult = enades.filter(t => t.id !== enadeId);
      this.enadeSubject.next(enadesResult);
    },
    (error) => {
      const enades = this.enadeSubject.getValue();
      const enadesResult = enades.filter(t => t.id !== enadeId);
      this.enadeSubject.next(enadesResult);
    });
  }

  saveImages(files: FileList, newEnade: EnadeWithImage | EnadeWithImage[]): void {
    const formData = new FormData();

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('imageFile', files[i]);
      }
    }

    if (Array.isArray(newEnade)) {
      newEnade.forEach(enade => {
        Object.keys(enade).forEach(key => {
          if(enade[key] != '') {
            formData.append(key, enade[key]);
          }
        });
      });
    } else {
      Object.keys(newEnade).forEach(key => {
        if(newEnade[key] != '') {
          formData.append(key, newEnade[key]);
        }
      });
    }

    this.http.post<EnadeWithImage>(`${API}/enade/imagens`, formData).subscribe(newEnade => {
      let enadeTemp: EnadeWithImage[] = this.enadeWithImageSubject.getValue();
      enadeTemp = [...enadeTemp, newEnade];
      this.enadeWithImageSubject.next(enadeTemp);
    });
  }

  getImages(imageId: any): Observable<any> {
    return this.http.get(`${API}/enade/imagens/${imageId}`);
  }

  createEnade(enade: any): void {
    this.http.post<Enade>(`${API}/enade`, enade).pipe(
      tap(newEnade => {
        this.enadeSubject.next([...this.enadeSubject.getValue(), newEnade]);
      }),
      catchError(error => {
        this.toastr.error('Erro ao criar pergunta:', error);
        return throwError(error);
      })
    ).subscribe();
  }

  update(id: string, enade: any): void {
    this.http.put<Enade>(`${API}/enade/${id}`, enade).pipe(
      tap(updateEnade => {
        const currentEnade = this.enadeSubject.getValue();
        const enadeResult = currentEnade.map((t) => {
          if (t.id === updateEnade.id) {
            return updateEnade;
          }
          return t;
        });
        this.enadeSubject.next(enadeResult);
      }),
      catchError(error => {
        this.toastr.error('Erro na atualização da pergunta:', error);
        return throwError(error);
      })
    ).subscribe();
  }
}
