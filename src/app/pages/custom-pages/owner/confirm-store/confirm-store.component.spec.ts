import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmStoreComponent } from './confirm-store.component';

describe('confirmStoreComponent', () => {
  let component: ConfirmStoreComponent;
  let fixture: ComponentFixture<ConfirmStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
