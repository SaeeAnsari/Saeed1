import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteReportV2Component } from './quote-report-v2.component';

describe('QuoteReportV2Component', () => {
  let component: QuoteReportV2Component;
  let fixture: ComponentFixture<QuoteReportV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteReportV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteReportV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
