import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProExperienceComponent } from './update-pro-experience.component';

describe('UpdateProExperienceComponent', () => {
  let component: UpdateProExperienceComponent;
  let fixture: ComponentFixture<UpdateProExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProExperienceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
