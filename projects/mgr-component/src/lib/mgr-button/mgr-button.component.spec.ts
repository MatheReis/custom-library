import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MgrButtonComponent } from './mgr-button.component';

describe('MgrButtonComponent', () => {
  let component: MgrButtonComponent;
  let fixture: ComponentFixture<MgrButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MgrButtonComponent]
    });
    fixture = TestBed.createComponent(MgrButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
