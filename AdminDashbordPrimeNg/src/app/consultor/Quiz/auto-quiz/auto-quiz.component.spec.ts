import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoQuizComponent } from './auto-quiz.component';

describe('AutoQuizComponent', () => {
  let component: AutoQuizComponent;
  let fixture: ComponentFixture<AutoQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
