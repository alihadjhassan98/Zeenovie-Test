import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainingQualifiicationsComponent } from './add-training-qualifiications.component';

describe('AddTrainingQualifiicationsComponent', () => {
  let component: AddTrainingQualifiicationsComponent;
  let fixture: ComponentFixture<AddTrainingQualifiicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTrainingQualifiicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTrainingQualifiicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
