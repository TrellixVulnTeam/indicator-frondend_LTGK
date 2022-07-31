
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { NgbAccordion, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { CarInformation } from 'src/app/indicator/models/common/carInformation.model';

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
  newOrderDetail: OrderDetail = new OrderDetail()
  @ViewChild('acc') acc: NgbAccordion
  rowNumber: number = 0;
  isCreateDetail: boolean = false;
  rowIndex: number;

  constructor(private route: Router,
    private activateRoute: ActivatedRoute,
    private orderService: OrderService,
    private toast: ToastService) {
    let id = +this.activateRoute.snapshot.paramMap.get("id")
    this.viewAction = this.activateRoute.snapshot.data["viewAction"]
    this.order.orderHeaderVM = new OrderHeader()
    this.order.orderDetailVM = new Array<OrderDetail>()

    if (this.viewAction == ViewActions.Edit) {
      this.getById(id);
    }
  }
  title: string;

  ngOnInit(): void {
    this.orderService.getSelects().subscribe(data => {
      this.customers = data[0]
      this.carInformations = data[1]
    })
  }

  getById(id: number) {
    this.orderService.getbyId(id).subscribe(
      {
        next: (data: any) => {
          this.order.orderHeaderVM = data.orderHeaderVM;
          this.preInvoice.fileNo = data.orderHeaderVM.preInvoiceFileNo
          this.preInvoice.documentNo = data.orderHeaderVM.preInvoiceDocumentNo
          this.preInvoice.preOrderUnitValue = data.orderHeaderVM.preInvoicePreOrderUnitValue
          this.order.orderDetailVM = data.orderDetailVM;
          this.rowNumber = this.order.orderDetailVM.length
        },
        error: (e) => this.toast.show(e),
      })
  }

  getPreInvoice() {
    this.orderService.getPreInvoice(this.preInvoice.fileNo).subscribe((data?: any) => {
      if (data == null) {
        this.toast.show('There is no document with entered number')
      } else {
        this.preInvoice = data;
        this.order.orderHeaderVM.preInvoiceId = this.preInvoice.id
      }
    }
    )
  }

  create() {
    this.orderService.create(this.order).subscribe({
      next: () => {
        this.route.navigate(['order/index'])
      },
      error: (e) => this.toast.show(e)
    })
  }

  edit() {

    this.orderService.edit(this.order.orderHeaderVM).subscribe(data => {
      console.log(data);
      this.route.navigate(['order/index'])
    }, err => {
      console.log(err)
    })
  }

  backToList() {
    this.route.navigate(['order/index'])
  }

  newDetail() {
    this.newOrderDetail = new OrderDetail();
  }

  editDetail(index) {
    // this.newOrderDetail.customerId = this.order.orderDetailVM[index].customerId
    // this.newOrderDetail.carInformationId = +this.order.orderDetailVM[index].carInformationId
    // this.newOrderDetail.reagentName = this.order.orderDetailVM[index].reagentName
    // this.newOrderDetail.rowNo = this.order.orderDetailVM[index].rowNo
    this.newOrderDetail = {... this.order.orderDetailVM[index]}
    this.rowIndex = index
  }

  deleteDetail(index) {
    this.order.orderDetailVM.splice(index, 1);
    this.changeRowNumber(index)
  }

  saveDetail() {
    //fillNewDetailData
    const selectedCarInformation = this.carInformations.find(x => x.id == this.newOrderDetail.carInformationId)
    const selectedCustomer = this.customers.find(x => x.id == this.newOrderDetail.customerId)
    this.newOrderDetail.carInformationChassis = selectedCarInformation.chassisNumber
    this.newOrderDetail.customerName = selectedCustomer.firstName + " " + selectedCustomer.lastName

    if (this.isCreateDetail == true) {
      this.rowNumber++
      this.newOrderDetail.rowNo = this.rowNumber
      //addNewDetail
      this.order.orderDetailVM.push({ ... this.newOrderDetail })

    } else {
      this.order.orderDetailVM[this.rowIndex] = { ... this.newOrderDetail }
    }

    this.acc.collapse('detailAcc')
    this.acc.panels.get(0).disabled = true
  }

  openAcc(mode: boolean, editIndex?: number) {
    this.acc.panels.get(0).disabled = false
    this.acc.expand('detailAcc');

    if (mode == true) {
      this.newDetail();
      this.isCreateDetail = true
    } else {
      this.editDetail(editIndex);
      this.isCreateDetail = false;
    }
  }

  public beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'detailAcc' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  changeRowNumber(index) {
    if (index + 1 == this.rowNumber) {
      this.rowNumber--
    } else {
      for (let i = index; index < this.order.orderDetailVM.length; index++) {
        this.order.orderDetailVM[i].rowNo = i + 1
      }
      this.rowNumber = this.order.orderDetailVM.length
    }
  }
}

