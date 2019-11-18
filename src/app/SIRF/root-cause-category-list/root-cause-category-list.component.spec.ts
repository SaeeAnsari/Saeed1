import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootCauseCategoryListComponent } from './root-cause-category-list.component';

describe('RootCauseCategoryListComponent', () => {
  let component: RootCauseCategoryListComponent;
  let fixture: ComponentFixture<RootCauseCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootCauseCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootCauseCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
