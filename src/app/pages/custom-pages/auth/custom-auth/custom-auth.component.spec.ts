import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAuthComponent } from './custom-auth.component';

describe('CustomAuthComponent', () => {
  let component: CustomAuthComponent;
  let fixture: ComponentFixture<CustomAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
