import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Professor } from 'src/app/interfaces/professor';
import { ProfessorService } from 'src/app/service/professor/professor.service';

@Component({
  selector: 'app-create-professor',
  templateUrl: './create-professor.component.html',
  styleUrls: ['./create-professor.component.scss']
})
export class CreateProfessorComponent implements OnInit {
  code: string = '';
  name: string = '';
  semester: string = '';
  professor: string = '';
  validado: boolean = false;

  formulario: FormGroup = this.fomBuilder.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
    semester: ['', Validators.required],
    professor: ['', Validators.required],
  });

  constructor(
    private service: ProfessorService,
    private fomBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async createProfessor() : Promise<void> {
    if(this.formulario.valid) {
      const newProfessor: Professor = this.formulario.value;
      await this.service.create(newProfessor)
      this.router.navigate(['/admin/professor']);
    }
  }

  cancelar() {
    this.router.navigate(['/admin/professor']);
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
}
