import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SIRFReportComponent } from './sirfreport.component';

describe('SIRFReportComponent', () => {
  let component: SIRFReportComponent;
  let fixture: ComponentFixture<SIRFReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SIRFReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SIRFReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
