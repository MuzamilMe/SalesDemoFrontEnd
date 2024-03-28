import { ComponentFixture, TestBed } from '@angular/core/testing';

import {MyTableComponent} from "./my-table.component";

describe('TableComponent', () => {
  let component: MyTableComponent<any>;
  let fixture: ComponentFixture<MyTableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTableComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
