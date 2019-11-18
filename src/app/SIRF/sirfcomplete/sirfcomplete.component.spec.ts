import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SIRFCompleteComponent } from './sirfcomplete.component';

describe('SIRFCompleteComponent', () => {
  let component: SIRFCompleteComponent;
  let fixture: ComponentFixture<SIRFCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SIRFCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SIRFCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
