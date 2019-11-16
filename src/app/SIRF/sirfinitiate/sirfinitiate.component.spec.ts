import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SIRFInitiateComponent } from './sirfinitiate.component';

describe('SIRFInitiateComponent', () => {
  let component: SIRFInitiateComponent;
  let fixture: ComponentFixture<SIRFInitiateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SIRFInitiateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SIRFInitiateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
