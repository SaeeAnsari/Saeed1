import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingFinalisedComponent } from './pricing-finalised.component';

describe('PricingFinalisedComponent', () => {
  let component: PricingFinalisedComponent;
  let fixture: ComponentFixture<PricingFinalisedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingFinalisedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingFinalisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
