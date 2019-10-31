import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingInitiateComponent } from './pricing-initiate.component';

describe('PricingInitiateComponent', () => {
  let component: PricingInitiateComponent;
  let fixture: ComponentFixture<PricingInitiateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingInitiateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingInitiateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
