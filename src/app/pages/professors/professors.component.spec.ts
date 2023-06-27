import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessoresComponent } from './professors.component';

describe('ProfessorsComponent', () => {
  let component: ProfessorsComponent;
  let fixture: ComponentFixture<ProfessorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
