import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { QuestionMultipleChoice } from 'src/app/interfaces/questionMultipleChoice';
import { environment } from 'src/environments/environment';

const API = environment.ApiUrl;

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questionsSubject = new BehaviorSubject<QuestionMultipleChoice[]>([]);
  questions$ = this.questionsSubject.asObservable();

  constructor(
    private http: HttpClient,
    ) { }

  create(question: any): void {
    this.http.post<QuestionMultipleChoice>(`${API}/questao`, question).subscribe(newQuestion => {
      let questionTemp: QuestionMultipleChoice[] = this.questionsSubject.getValue();
      questionTemp = [...questionTemp, newQuestion];
      this.questionsSubject.next(questionTemp);
    });
  }

  saveImages(files: FileList, newQuestion: QuestionMultipleChoice | QuestionMultipleChoice[]): void {
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

    this.http.post<QuestionMultipleChoice>(`${API}/questao/imagens`, formData).subscribe(newQuestion => {
      let questionTemp: QuestionMultipleChoice[] = this.questionsSubject.getValue();
      questionTemp = [...questionTemp, newQuestion];
      this.questionsSubject.next(questionTemp);
    });
  }

  update(id: string, question: QuestionMultipleChoice): void {
    this.http.put<QuestionMultipleChoice>(`${API}/questao/${id}`, question)
      .subscribe(updateQuestion => {
        const questions = this.questionsSubject.getValue();
        const questionsResult = questions.map((t) => {
          if (t.id === updateQuestion.id) {
            return updateQuestion;
          }
          return t;
        });
        this.questionsSubject.next(questionsResult);
    },
    error => {
      console.error('Erro na atualização da pergunta:', error);
    });
  }

  getQuestion(id: number): Observable<QuestionMultipleChoice> {
    return this.http.get<QuestionMultipleChoice>(`${API}/questao/${id}`);
  }

  getImages(idImages: any): Observable<any> {
    return this.http.get(`${API}/questao/imagens/${idImages}`);
  }

  getAll(): void {
    this.http.get<any[]>(`${API}/questao`).subscribe(questions => {
      this.questionsSubject.next(questions);
    })
  }

  getQuestionData(): Observable<any>  {
    return this.http.get(`${API}/questao/dados`);
  }

  deleteQuestion(questionId: number): void {
    this.http.delete<QuestionMultipleChoice>(`${API}/questao/${questionId}`).subscribe(() => {
      const questions = this.questionsSubject.getValue();
      const questionsResult = questions.filter(t => t.id !== questionId);
      this.questionsSubject.next(questionsResult);
    },
    (error) => {
      const questions = this.questionsSubject.getValue();
      const questionsResult = questions.filter(t => t.id !== questionId);
      this.questionsSubject.next(questionsResult);
    });
  }
}
