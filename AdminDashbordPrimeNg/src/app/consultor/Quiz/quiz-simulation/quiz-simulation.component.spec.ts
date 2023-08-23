import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSimulationComponent } from './quiz-simulation.component';

describe('QuizSimulationComponent', () => {
  let component: QuizSimulationComponent;
  let fixture: ComponentFixture<QuizSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizSimulationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
