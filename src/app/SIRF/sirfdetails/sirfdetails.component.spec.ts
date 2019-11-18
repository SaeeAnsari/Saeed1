import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SIRFDetailsComponent } from './sirfdetails.component';

describe('SIRFDetailsComponent', () => {
  let component: SIRFDetailsComponent;
  let fixture: ComponentFixture<SIRFDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SIRFDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SIRFDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
