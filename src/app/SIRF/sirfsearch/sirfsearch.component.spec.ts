import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SIRFSearchComponent } from './sirfsearch.component';

describe('SIRFSearchComponent', () => {
  let component: SIRFSearchComponent;
  let fixture: ComponentFixture<SIRFSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SIRFSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SIRFSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
