import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCostCategoryComponent } from './modal-cost-category.component';

describe('ModalCostCategoryComponent', () => {
  let component: ModalCostCategoryComponent;
  let fixture: ComponentFixture<ModalCostCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCostCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCostCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
