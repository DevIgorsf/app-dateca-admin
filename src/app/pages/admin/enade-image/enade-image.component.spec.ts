import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnadeImageComponent } from './enade-image.component';

describe('EnadeImageComponent', () => {
  let component: EnadeImageComponent;
  let fixture: ComponentFixture<EnadeImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnadeImageComponent]
    });
    fixture = TestBed.createComponent(EnadeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
