import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTrainingQualifiicationsComponent } from './update-training-qualifiications.component';

describe('UpdateTrainingQualifiicationsComponent', () => {
  let component: UpdateTrainingQualifiicationsComponent;
  let fixture: ComponentFixture<UpdateTrainingQualifiicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTrainingQualifiicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTrainingQualifiicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
