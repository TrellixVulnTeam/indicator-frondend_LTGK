import { Component, OnInit } from '@angular/core';
import { PreInvoice } from 'src/app/indicator/models/invoice/preInvoice.model';
import { PreInvoiceService } from 'src/app/indicator/services/preInvoice.service';

@Component({
  selector: 'app-pre-invoice-index',
  templateUrl: './pre-invoice-index.component.html'
})
export class PreInvoiceIndexComponent implements OnInit {

  preInvoices: Array<PreInvoice> = [];

  constructor(private preInvoiceService: PreInvoiceService) { }

  ngOnInit(): void {
    this.preInvoiceService.index().subscribe(data => {
      this.preInvoices = data;
    })
  }

}
