import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEnadeWithImageComponent } from './create-enade-with-image.component';

describe('CreateEnadeWithImageComponent', () => {
  let component: CreateEnadeWithImageComponent;
  let fixture: ComponentFixture<CreateEnadeWithImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEnadeWithImageComponent]
    });
    fixture = TestBed.createComponent(CreateEnadeWithImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
