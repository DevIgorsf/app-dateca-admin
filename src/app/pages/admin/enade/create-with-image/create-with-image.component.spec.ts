import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWithImageComponent } from './create-with-image.component';

describe('CreateWithImageComponent', () => {
  let component: CreateWithImageComponent;
  let fixture: ComponentFixture<CreateWithImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateWithImageComponent]
    });
    fixture = TestBed.createComponent(CreateWithImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
