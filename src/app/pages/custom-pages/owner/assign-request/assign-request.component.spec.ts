import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRequestComponent } from './assign-request.component';

describe('AssignRequestComponent', () => {
  let component: AssignRequestComponent;
  let fixture: ComponentFixture<AssignRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
