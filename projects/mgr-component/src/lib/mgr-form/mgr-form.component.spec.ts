import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MgrFormComponent } from './mgr-form.component';

describe('MgrFormComponent', () => {
  let component: MgrFormComponent;
  let fixture: ComponentFixture<MgrFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MgrFormComponent]
    });
    fixture = TestBed.createComponent(MgrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
