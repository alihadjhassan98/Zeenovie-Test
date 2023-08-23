import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedQuizListComponent } from './assigned-quiz-list.component';

describe('AssignedQuizListComponent', () => {
  let component: AssignedQuizListComponent;
  let fixture: ComponentFixture<AssignedQuizListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedQuizListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedQuizListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
