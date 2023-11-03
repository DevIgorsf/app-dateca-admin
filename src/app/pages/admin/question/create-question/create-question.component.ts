import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/interfaces/course';
import { PointsEnum } from 'src/app/interfaces/pointsEnum';
import { QuestionMultipleChoice } from 'src/app/interfaces/questionMultipleChoice';
import { CourseService } from 'src/app/service/course/course.service';
import { QuestionService } from 'src/app/service/question/question.service';

//interface PointsEnum {
//  value: string;
//  description: string;
//}

type EnumKeys<T> = Extract<keyof T, string>;

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {
  points!: string[];
  coursesSubscription: Subscription = new Subscription();
  courses!: Course[];
  name: string = '';
  validado: boolean = false;

  formulario: FormGroup;

  constructor(
    private questionService: QuestionService,
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formulario = this.formBuilder.group({
      statement: ['', Validators.required],
      pointsEnum: [''],
      course: [''],
      correctAnswer: ['', Validators.required],
      alternativeA: ['', Validators.required],
      alternativeB: ['', Validators.required],
      alternativeC: ['', Validators.required],
      alternativeD: ['', Validators.required],
      alternativeE: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.points = Object.values(PointsEnum);
    this.courseService.getCourseByProfessor();
    this.coursesSubscription = this.courseService.courses$.subscribe((courses) => {
      this.courses = courses;
    });
  }

  async createQuestion() {
    console.log(this.formulario.value);
    if (this.formulario.valid) {
      const newQuestion = this.formulario.value;
      await this.questionService.create(newQuestion);
      this.router.navigate(['/admin/questao']);
    }
  }

  cancelar() {
    this.router.navigate(['/admin/questao']);
  }

  habilitarBotao(): string {
    return this.formulario.valid ? 'botao-salvar' : 'botao-desabilitado';
  }

  campoValidado(campoAtual: string): string {
    const control = this.formulario.get(campoAtual);
    if (control?.errors && control?.touched) {
      this.validado = false;
      return 'form-item input-invalido';
    } else {
      this.validado = true;
      return 'form-item';
    }
  }

}
