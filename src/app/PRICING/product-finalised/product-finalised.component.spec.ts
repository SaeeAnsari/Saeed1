import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFinalisedComponent } from './product-finalised.component';

describe('ProductFinalisedComponent', () => {
  let component: ProductFinalisedComponent;
  let fixture: ComponentFixture<ProductFinalisedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFinalisedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFinalisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
