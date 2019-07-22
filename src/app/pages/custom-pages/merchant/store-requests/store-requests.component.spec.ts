import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreRequestsComponent } from './store-requests.component';

describe('StoreRequestsComponent', () => {
  let component: StoreRequestsComponent;
  let fixture: ComponentFixture<StoreRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
