import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreInvoiceComponent } from './pre-invoice.component';

describe('PreInvoiceComponent', () => {
  let component: PreInvoiceComponent;
  let fixture: ComponentFixture<PreInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
