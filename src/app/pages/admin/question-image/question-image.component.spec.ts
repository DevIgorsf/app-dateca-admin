import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionImageComponent } from './question-image.component';

describe('QuestionImageComponent', () => {
  let component: QuestionImageComponent;
  let fixture: ComponentFixture<QuestionImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionImageComponent]
    });
    fixture = TestBed.createComponent(QuestionImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
