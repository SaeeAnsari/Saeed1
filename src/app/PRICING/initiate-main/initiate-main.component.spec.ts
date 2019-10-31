import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateMainComponent } from './initiate-main.component';

describe('InitiateMainComponent', () => {
  let component: InitiateMainComponent;
  let fixture: ComponentFixture<InitiateMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiateMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiateMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
