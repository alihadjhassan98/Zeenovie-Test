import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleConsultantDetailsComponent } from './single-consultant-details.component';

describe('SingleConsultantDetailsComponent', () => {
  let component: SingleConsultantDetailsComponent;
  let fixture: ComponentFixture<SingleConsultantDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleConsultantDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleConsultantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
