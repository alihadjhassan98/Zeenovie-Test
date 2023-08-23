import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLanguagesComponent } from './update-languages.component';

describe('UpdateLanguagesComponent', () => {
  let component: UpdateLanguagesComponent;
  let fixture: ComponentFixture<UpdateLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLanguagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
