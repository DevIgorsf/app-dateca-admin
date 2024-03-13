import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { Enade } from 'src/app/interfaces/Enade';
import { PointsEnum } from 'src/app/interfaces/pointsEnum';
import { EnadeService } from 'src/app/service/enade/enade.service';

@Component({
  selector: 'app-create-enade',
  templateUrl: './create-enade.component.html',
  styleUrls: ['./create-enade.component.scss']
})
export class CreateEnadeComponent {
  points!: string[];
  coursesSubscription: Subscription = new Subscription();
  name: string = '';
  validado: boolean = false;
  
  @Input() items: any[] = [];

  formulario: FormGroup;

  constructor(
    private enadeService: EnadeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formulario = this.formBuilder.group({
      id: [''],
      statement: ['', Validators.required],
      pointsEnum: [''],
      course: [''],
      idImages: [''],
      correctAnswer: ['', Validators.required],
      alternativeA: ['', Validators.required],
      alternativeB: ['', Validators.required],
      alternativeC: ['', Validators.required],
      alternativeD: ['', Validators.required],
      alternativeE: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const questionId = params['id'];
      if (questionId) {
        this.loadQuestionToEdit(questionId);
      }
    });
    this.points = Object.values(PointsEnum);
    
  }

  loadQuestionToEdit(questionId: number) {
    this.enadeService.getEnade(questionId).subscribe((question: Enade) => {
      this.fillFormWithQuestionData(question);
    });
  }

  fillFormWithQuestionData(question: Enade) {
    this.formulario.patchValue({
      id: question.id,
      statement: question.statement,
      pointsEnum: question.pointsEnum,
      correctAnswer: question.correctAnswer,
      alternativeA: question.alternativeA,
      alternativeB: question.alternativeB,
      alternativeC: question.alternativeC,
      alternativeD: question.alternativeD,
      alternativeE: question.alternativeE,
    });
  }
  
  async createEnade() {
    

    this.router.navigate(['/admin/questao']);
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
    
  
