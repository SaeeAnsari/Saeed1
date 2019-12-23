import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingFinalisedUpdateComponent } from './pricing-finalised-update.component';

describe('PricingFinalisedUpdateComponent', () => {
  let component: PricingFinalisedUpdateComponent;
  let fixture: ComponentFixture<PricingFinalisedUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingFinalisedUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingFinalisedUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
