import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProExperienceComponent } from './add-pro-experience.component';

describe('AddProExperienceComponent', () => {
  let component: AddProExperienceComponent;
  let fixture: ComponentFixture<AddProExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProExperienceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
