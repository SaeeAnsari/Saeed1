import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SIRFCostTrackingComponent } from './sirfcost-tracking.component';

describe('SIRFCostTrackingComponent', () => {
  let component: SIRFCostTrackingComponent;
  let fixture: ComponentFixture<SIRFCostTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SIRFCostTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SIRFCostTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
