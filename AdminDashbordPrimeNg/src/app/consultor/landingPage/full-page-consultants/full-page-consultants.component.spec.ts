import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullPageConsultantsComponent } from './full-page-consultants.component';

describe('FullPageConsultantsComponent', () => {
  let component: FullPageConsultantsComponent;
  let fixture: ComponentFixture<FullPageConsultantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullPageConsultantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullPageConsultantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
