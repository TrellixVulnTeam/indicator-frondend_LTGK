import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PreInvoice } from '../../models/invoice/preInvoice.model';
import { PreInvoiceService } from '../../services/preInvoice.service';

@Component({
  selector: 'app-pre-invoice-modal',
  templateUrl: './pre-invoice-modal.component.html'
})
export class PreInvoiceModalComponent {

  preInvoices: Array<PreInvoice> = new Array<PreInvoice>()

  constructor(public activeModal: NgbActiveModal,private preInvoiceService: PreInvoiceService) {
    this.preInvoiceService.index().subscribe(data => {
      this.preInvoices = data
    })
  }

  closeModal(preInvoice: PreInvoice){
    this.activeModal.close(preInvoice)
  }

}
