import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderDetailModal } from '../../models/invoice/orderDetailModal.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html'
})
export class OrderModalComponent {
  orderDetailsModal: Array<OrderDetailModal> = new Array<OrderDetailModal>()

  constructor(public activeModal: NgbActiveModal, private orderService: OrderService) {
    this.orderService.getOrderDetails().subscribe(data => {

      this.orderDetailsModal = data;
    })
  }

  closeModal(order: OrderDetailModal){
    this.activeModal.close(order)
  }
}

