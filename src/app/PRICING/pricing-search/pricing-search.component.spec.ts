import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingSearchComponent } from './pricing-search.component';

describe('PricingSearchComponent', () => {
  let component: PricingSearchComponent;
  let fixture: ComponentFixture<PricingSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
