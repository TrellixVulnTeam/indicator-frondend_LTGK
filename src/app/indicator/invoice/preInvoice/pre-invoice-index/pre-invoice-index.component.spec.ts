import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreInvoiceIndexComponent } from './pre-invoice-index.component';

describe('PreInvoiceIndexComponent', () => {
  let component: PreInvoiceIndexComponent;
  let fixture: ComponentFixture<PreInvoiceIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreInvoiceIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreInvoiceIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
