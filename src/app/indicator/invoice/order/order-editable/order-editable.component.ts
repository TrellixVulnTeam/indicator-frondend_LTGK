
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ViewActions } from 'src/app/indicator/enums/viewActions';
import { Order } from 'src/app/indicator/models/invoice/order.model';
import { OrderDetail } from 'src/app/indicator/models/invoice/orderDetail.model';
import { OrderHeader } from 'src/app/indicator/models/invoice/orderHeader.model';
import { PreInvoice } from 'src/app/indicator/models/invoice/preInvoice.model';
import { OrderService } from 'src/app/indicator/services/order.service';
import { ToastService } from 'src/app/indicator/services/toast.service';

@Component({
  selector: 'app-order-editable',
  templateUrl: './order-editable.component.html'
})
export class OrderEditableComponent implements OnInit, AppComponent {

  order: Order = new Order();
  preInvoice: PreInvoice = new PreInvoice();
  viewAction: ViewActions;
  tt:boolean = true;
  ff:boolean;


  constructor(private route: Router,
    private activateRoute: ActivatedRoute,
    private orderService: OrderService,
    private toast: ToastService) {
    let id = +this.activateRoute.snapshot.paramMap.get("id")
    this.viewAction = this.activateRoute.snapshot.data["viewAction"]
    this.order.orderHeader = new OrderHeader()
    this.order.orderDetails = new Array<OrderDetail>()


    if (this.viewAction == ViewActions.Edit) {
      this.getById(id);
    }
  }
  title: string;

  ngOnInit(): void {
    // const toastTrigger = document.getElementById('liveToastBtn')
    // const toastLiveExample = document.getElementById('liveToast')
    // if (toastTrigger) {
    //   toastTrigger.addEventListener('click', () => {
    //     const toast = new bootstrap.Toast(toastLiveExample)

    //     toast.show()
    //   })
    // }
  }

  getById(id: number) {
    this.orderService.getbyId(id).subscribe(data => {
      this.order.orderHeader = data.orderHeader;
      this.order.orderDetails = data.orderDetails;
    }, err => {
      console.log(err)
    })
  }

  getPreInvoice() {
    this.tt  = this.preInvoice.fileNo == '';
    this.ff = this.preInvoice.fileNo != '';
    this.orderService.getPreInvoice(this.preInvoice.fileNo).subscribe(data => {

      if (data == null) {
        this.toast.show('There is no document with entered number')
      }else{
        this.preInvoice = data;
      }

    }, err => {
      console.log(err)
    })
  }

  create() {
    this.orderService.create(this.order.orderHeader).subscribe(data => {
      console.log(data);
      this.route.navigate(['order/index'])
    }, err => {
      console.log(err)
    })
  }

  edit() {

    this.orderService.edit(this.order.orderHeader).subscribe(data => {
      console.log(data);
      this.route.navigate(['order/index'])
    }, err => {
      console.log(err)
    })
  }

  backToList() {
    this.route.navigate(['order/index'])
  }

}

