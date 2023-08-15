import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from 'src/app/interfaces/course';
import { environment } from 'src/environments/environment';

const API = environment.ApiUrl;


@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSubject.asObservable();

  constructor(
    private http: HttpClient,
    ) { }

  create(course: Course): void {
    this.http.post<Course>(`${API}/materia`, course).subscribe(novocourse => {
      let courseTemp: Course[] = this.coursesSubject.getValue();
      courseTemp = [...courseTemp, novocourse];
      this.coursesSubject.next(courseTemp);
    });
  }

  update(id: string, course: Course): void {
    this.http.put<Course>(`${API}/materia/${id}`, course).subscribe(updatecourse => {
      const courses = this.coursesSubject.getValue();
      const coursesResult = courses.map((t) => {
        if (t.id === updatecourse.id) {
          return updatecourse;
        }
        return t;
      });
      this.coursesSubject.next(coursesResult);
    });
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${API}/materia/${id}`);
  }

  getAll(): void {
    this.http.get<Course[]>(`${API}/materia`).subscribe(courses =>{
      this.coursesSubject.next(courses);
    })
  }

  getCourseByProfessor() {
    this.http.get<Course[]>(`${API}/materia/professor`).subscribe(courses =>{
      this.coursesSubject.next(courses);
    })
  }

  deleteCourse(courseId: number): void {
    this.http.delete<Course>(`${API}/materia/${courseId}`).subscribe(() => {
      const courses = this.coursesSubject.getValue();
      const coursesResult = courses.filter(t => t.id !== courseId);
      this.coursesSubject.next(coursesResult);
    },
    (error) => {
      const courses = this.coursesSubject.getValue();
      const coursesResult = courses.filter(t => t.id !== courseId);
      this.coursesSubject.next(coursesResult);
    });
  }

  getCourseData(): Observable<any> {
    return this.http.get(`${API}/materia/dados`);
  }
}
