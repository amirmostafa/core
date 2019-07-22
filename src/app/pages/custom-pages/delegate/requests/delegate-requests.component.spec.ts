import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateRequestsComponent } from './delegate-requests.component';

describe('DelegateRequestsComponent', () => {
  let component: DelegateRequestsComponent;
  let fixture: ComponentFixture<DelegateRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelegateRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegateRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
