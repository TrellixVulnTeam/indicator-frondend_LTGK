
import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ViewActions } from 'src/app/indicator/enums/viewActions';
import { Order } from 'src/app/indicator/models/invoice/order.model';
import { OrderDetail } from 'src/app/indicator/models/invoice/orderDetail.model';
import { OrderHeader } from 'src/app/indicator/models/invoice/orderHeader.model';
import { PreInvoice } from 'src/app/indicator/models/invoice/preInvoice.model';
import { OrderService } from 'src/app/indicator/services/order.service';
import { ToastService } from 'src/app/indicator/services/toast.service';
import { Observable, of } from 'rxjs';
import { Customer } from 'src/app/indicator/models/common/customer.model';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { CarInformation } from 'src/app/indicator/models/common/carInformation.model';
import { BootstrapOptions } from '@angular/core';

@Component({
  selector: 'app-order-editable',
  templateUrl: './order-editable.component.html'
})
export class OrderEditableComponent implements OnInit, AppComponent {

  order: Order = new Order();
  preInvoice: PreInvoice = new PreInvoice();
  viewAction: ViewActions;
  customers: Array<Customer> = new Array<Customer>();
  carInformations: Array<CarInformation> = new Array<CarInformation>();
  @ViewChild('acc') acc: NgbAccordion


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
    this.orderService.getSelects().subscribe(data =>{
      this.customers = data[0]
      this.carInformations = data[1]
    })
  }

  getById(id: number) {
    of(this.orderService.getbyId(id)).subscribe(
      {
        next: (data: any) => {
          this.order.orderHeader = data.orderHeader;
          this.order.orderDetails = data.orderDetails;
        },
        error: (e) => this.toast.show(e),
      })
  }

  getPreInvoice() {
    this.orderService.getPreInvoice(this.preInvoice.fileNo) .subscribe( (data?: any) =>{
      if (data == null) {
        this.toast.show('There is no document with entered number')
      } else {
        this.preInvoice = data;
      }  
    }
    )
  }

  create() {
    of(this.orderService.create(this.order.orderHeader)).subscribe({
      next: () => {
        this.route.navigate(['order/index'])
      },
      error: (e) => this.toast.show(e)
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

  newDetail(){

  }

  openAcc(){
    this.acc.toggle('detailAcc');
  }
}

