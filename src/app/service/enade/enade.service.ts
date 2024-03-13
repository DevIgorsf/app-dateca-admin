import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnadeService {
  getEnade(questionId: number) {
    throw new Error('Method not implemented.');
  }
  saveImages(file: FileList, newQuestion: any) {
    throw new Error('Method not implemented.');
  }
  getEnadeWithImage(questionId: number) {
    throw new Error('Method not implemented.');
  }
  getImages(imageId: string): any {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
