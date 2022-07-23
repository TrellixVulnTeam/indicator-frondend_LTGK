import { Component, OnInit } from '@angular/core';
import { OrderHeader } from 'src/app/indicator/models/invoice/orderHeader.model';
import { OrderService } from 'src/app/indicator/services/order.service';

@Component({
  selector: 'app-order-index',
  templateUrl: './order-index.component.html'
})
export class OrderIndexComponent implements OnInit {

  orderHeaders: Array<OrderHeader> = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.index().subscribe(data => {
      this.orderHeaders = data;
    })
  }

}
