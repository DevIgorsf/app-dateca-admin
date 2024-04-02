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
      year: ['', Validators.required],
      number: ['', Validators.required],
      statement: ['', Validators.required],
      pointsEnum: [''],
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
      const enadeId = params['id'];
      if (enadeId) {
        this.loadEnadeToEdit(enadeId);
      }
    });
    this.points = Object.values(PointsEnum);
    
  }

  loadEnadeToEdit(enadeId: number) {
    this.enadeService.getEnade(enadeId).subscribe((enade: Enade) => {
      this.fillFormWithEnadeData(enade);
    });
  }

  fillFormWithEnadeData(enade: Enade) {
    this.formulario.patchValue({
      id: enade.id,
      year: enade.year,
      number:enade.number,
      statement: enade.statement,
      pointsEnum: enade.pointsEnum,
      correctAnswer: enade.correctAnswer,
      alternativeA: enade.alternativeA,
      alternativeB: enade.alternativeB,
      alternativeC: enade.alternativeC,
      alternativeD: enade.alternativeD,
      alternativeE: enade.alternativeE,
    });
  }
  
  async createEnade() {
    const newEnade = this.formulario.value;

    if(this.formulario.valid) {
      if(!newEnade.id) {
        await this.enadeService.createEnade(newEnade);
      } else {
        await this.enadeService.update(newEnade.id, newEnade);
      }
    }

    this.router.navigate(['/admin/enade']);
  }

  cancelar() {
    this.router.navigate(['/admin/enade']);
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
    
  
