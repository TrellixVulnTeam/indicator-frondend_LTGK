import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreInvoiceEditableComponent } from './pre-invoice-editable.component';

describe('PreInvoiceEditableComponent', () => {
  let component: PreInvoiceEditableComponent;
  let fixture: ComponentFixture<PreInvoiceEditableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreInvoiceEditableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreInvoiceEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
