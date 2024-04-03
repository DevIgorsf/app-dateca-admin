import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { EnadeWithImage } from 'src/app/interfaces/EnadeWithImage';
import { PointsEnum } from 'src/app/interfaces/pointsEnum';
import { EnadeService } from 'src/app/service/enade/enade.service';

@Component({
  selector: 'app-create-enade-with-image',
  templateUrl: './create-enade-with-image.component.html',
  styleUrls: ['./create-enade-with-image.component.scss']
})
export class CreateEnadeWithImageComponent {
    points!: string[];
    file!: FileList;
    images: any[] = [];
    preview!: string;
    name: string = '';
    validado: boolean = false;
    
    @Input() items: any[] = [];
    slideIndex: number = 0;
    slideOffset: string = '0';
  
    goToSlide(index: number): void {
      this.slideIndex = index;
    }
    prevSlide(): void {
      if (this.slideIndex > 0) {
        this.slideIndex--;
        this.updateSlideOffset();
      } else {
        this.slideIndex = this.images.length - 1;
        this.updateSlideOffset();
      }
    }
  
    nextSlide(): void {
      if (this.slideIndex < this.images.length - 1) {
        this.slideIndex++;
        this.updateSlideOffset();
      } else {
        this.slideIndex = 0;
        this.updateSlideOffset();
      }
    }
  
    updateSlideOffset(): void {
      this.slideOffset = `-${this.slideIndex * 100}%`;
    }
  
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
        images: [''],
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
      this.enadeService.getEnadeWithImage(enadeId).subscribe((enade: EnadeWithImage) => {
        this.fillFormWithEnadeData(enade);
        this.images = enade.images.map(response => {
          return 'data:image/jpeg;base64,' + response.imagem;
        });
      });
    }
  
    fillFormWithEnadeData(enade: EnadeWithImage) {
      this.formulario.patchValue({
        id: enade.id,
        statement: enade.statement,
        pointsEnum: enade.pointsEnum,
        images: enade.images,
        correctAnswer: enade.correctAnswer,
        alternativeA: enade.alternativeA,
        alternativeB: enade.alternativeB,
        alternativeC: enade.alternativeC,
        alternativeD: enade.alternativeD,
        alternativeE: enade.alternativeE,
      });
    }
  
    handleFile(event: any): void {
      this.file = event?.target?.files;
      if (this.file && this.file.length > 0) {
        this.images = [];
        for (let i = 0; i < this.file.length; i++) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.images.push(e.target?.result as string);
          };
          reader.readAsDataURL(this.file[i]);
        }
      } else {
        this.images = [];
      }
    }
    
    async createEnadeWithImage() {
      if (this.file) {
        const newEnade = this.formulario.value;
        this.enadeService.saveImages(this.file, newEnade);
      } 
  
      this.router.navigate(['/admin/enade-imagem']);
    }
  
    cancelar() {
      this.router.navigate(['/admin/enade-imagem']);
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
  
