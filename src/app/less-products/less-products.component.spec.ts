import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LessProductsComponent} from './less-products.component';

describe('LessProductsComponent', () => {
  let component: LessProductsComponent;
  let fixture: ComponentFixture<LessProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LessProductsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LessProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
