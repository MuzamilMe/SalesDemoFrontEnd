import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatewiseSalesComponent } from './datewise-sales.component';

describe('DatewiseSalesComponent', () => {
  let component: DatewiseSalesComponent;
  let fixture: ComponentFixture<DatewiseSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatewiseSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatewiseSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
