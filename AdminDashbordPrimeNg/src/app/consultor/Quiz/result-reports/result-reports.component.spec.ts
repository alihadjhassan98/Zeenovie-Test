import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultReportsComponent } from './result-reports.component';

describe('ResultReportsComponent', () => {
  let component: ResultReportsComponent;
  let fixture: ComponentFixture<ResultReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
