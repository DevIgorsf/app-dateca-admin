import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuestionWithImageComponent } from './create-question-with-image.component';

describe('CreateQuestionWithImageComponent', () => {
  let component: CreateQuestionWithImageComponent;
  let fixture: ComponentFixture<CreateQuestionWithImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateQuestionWithImageComponent]
    });
    fixture = TestBed.createComponent(CreateQuestionWithImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
