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

  formulario = this.formBuilder.group({
    statement: ['', Validators.required],
    pointsEnum: [''],
    course: [''],
    choices: this.formBuilder.array([
      this.createChoice('A', true),  // Opção A é a correta
      this.createChoice('B', false),
      this.createChoice('C', false),
      this.createChoice('D', false)
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

  createChoice(letter: string, isCorrect: boolean) {
    return this.formBuilder.group({
      letter: [letter, Validators.required],
      text: ['', Validators.required],
      correctAnswer: [isCorrect]
    });
  }

  get choices(): FormArray {
    return this.formulario.get('choices') as FormArray;
  }

  handleRadioChange(index: number) {
    const choicesArray = this.formulario.get('choices') as FormArray;

    choicesArray.controls.forEach((choiceControl, i) => {
      if (i !== index) {
        choiceControl.get('correctAnswer')?.setValue(false);
      }
    });

    const selectedChoiceControl = choicesArray.at(index);
    selectedChoiceControl.get('correctAnswer')?.setValue(true);
  }
}
