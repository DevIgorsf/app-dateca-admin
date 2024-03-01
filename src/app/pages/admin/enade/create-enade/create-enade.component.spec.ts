import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEnadeComponent } from './create-enade.component';

describe('CreateEnadeComponent', () => {
  let component: CreateEnadeComponent;
  let fixture: ComponentFixture<CreateEnadeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEnadeComponent]
    });
    fixture = TestBed.createComponent(CreateEnadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
