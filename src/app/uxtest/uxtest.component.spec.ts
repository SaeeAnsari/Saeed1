import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UXTestComponent } from './uxtest.component';

describe('UXTestComponent', () => {
  let component: UXTestComponent;
  let fixture: ComponentFixture<UXTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UXTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UXTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
