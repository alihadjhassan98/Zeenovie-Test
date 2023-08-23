import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommandedJobsForConsultantsComponent } from './recommanded-jobs-for-consultants.component';

describe('RecommandedJobsForConsultantsComponent', () => {
  let component: RecommandedJobsForConsultantsComponent;
  let fixture: ComponentFixture<RecommandedJobsForConsultantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommandedJobsForConsultantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommandedJobsForConsultantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
