import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/interfaces/course';
import { QuestionMultipleChoice } from 'src/app/interfaces/questionMultipleChoice';
import { CourseService } from 'src/app/service/course/course.service';
import { QuestionService } from 'src/app/service/question/question.service';

interface PointsEnum {
  value: string;
  description: string;
}

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent {
  points: PointsEnum[] = [
    {value: '5', description: 'Fácil'},
    {value: '7', description: 'Normal'},
    {value: '9', description: 'Difícil'},
  ];
  coursesSubscription: Subscription = new Subscription();
  courses!: Course[];
  name: string = '';
  validado: boolean = false;

  formulario: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    statement: ['', Validators.required],
    pointsEnum: [''],
    course: [''],
    choices: this.formBuilder.array([
      this.createChoice('A'),
      this.createChoice('B'),
      this.createChoice('C'),
      this.createChoice('D')
    ])
  });

  constructor(
    private questionService: QuestionService,
    private courseService : CourseService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.courseService.getCourseByProfessor();
    this.coursesSubscription = this.courseService.courses$.subscribe(courses => {
      this.courses = courses;
    })

  }

  createQuestion() {
    console.log(this.formulario.value);
    // if(this.formulario.valid) {
    //   const newQuestion: QuestionMultipleChoice = this.formulario.value;
    //   await this.questionService.create(newQuestion)
    //   this.router.navigate(['/admin/questao']);
    // }
  }

  cancelar() {
    this.router.navigate(['/admin/questao']);
  }

  habilitarBotao(): string {
    if (this.formulario.valid) {
      return 'botao-salvar';
    } else return 'botao-desabilitado';
  }

  campoValidado(campoAtual: string): string {
    if (
      this.formulario.get(campoAtual)?.errors &&
      this.formulario.get(campoAtual)?.touched
    ) {
      this.validado = false;
      return 'form-item input-invalido';
    } else {
      this.validado = true;
      return 'form-item';
    }
  }

  createChoice(letter: string) {
    return this.formBuilder.group({
      letter: [letter, Validators.required],
      text: ['', Validators.required],
      correctAnswer: [false]
    });
  }

  addChoice(): void {
    this.choices.push(this.createChoice('A'));
    this.choices.push(this.createChoice('B'));
    this.choices.push(this.createChoice('C'));
    this.choices.push(this.createChoice('D'));
    console.log(this.choices.controls);
  }

  get choices(): FormArray {
    return this.formulario.get('choices') as FormArray;
  }
}
