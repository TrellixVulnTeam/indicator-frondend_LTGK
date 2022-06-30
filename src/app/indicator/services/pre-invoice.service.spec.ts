import { TestBed } from '@angular/core/testing';

import { PreInvoiceService } from './pre-invoice.service';

describe('PreInvoiceService', () => {
  let service: PreInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
