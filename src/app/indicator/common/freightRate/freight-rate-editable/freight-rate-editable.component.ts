import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ImEx } from 'src/app/indicator/enums/imEx.enum';
import { Inspectors } from 'src/app/indicator/enums/inspectors.enum';
import { ViewActions } from 'src/app/indicator/enums/viewActions';
import { OrderModalComponent } from 'src/app/indicator/modals/order-modal/order-modal.component';
import { FreightRate } from 'src/app/indicator/models/common/freightRate.model';
import { FreightRateService } from 'src/app/indicator/services/freightRate.service';

@Component({
  selector: 'app-freight-rate-editable',
  templateUrl: './freight-rate-editable.component.html'
})
export class FreightRateEditableComponent implements OnInit {

  freightRate: FreightRate = new FreightRate();
  viewAction: ViewActions;
  imexList: string[] = Object.keys(ImEx);
  inspectors: string[] = Object.keys(Inspectors)

  constructor(private route: Router,
     private activateRoute: ActivatedRoute,
      private freightRateService: FreightRateService,
      private modalService: NgbModal) {
    let id = +this.activateRoute.snapshot.paramMap.get("id")
    this.viewAction = this.activateRoute.snapshot.data["viewAction"]

    if (this.viewAction == ViewActions.Edit) {
      this.getById(id);
    }
  }

  ngOnInit(): void {
  }

  getById(id: number) {
    this.freightRateService.getbyId(id).subscribe(data => {
      this.freightRate = data;
      this.correctDate()
    }, err => {
      console.log(err)
    })
  }

  create() {
    this.fillDate()
    this.freightRateService.create(this.freightRate).subscribe(() => {
      this.route.navigate(['freightRate/index'])
    }, err => {
      console.log(err)
    })
  }

  edit() {
    this.fillDate()
    this.freightRateService.edit(this.freightRate).subscribe(() => {
      this.route.navigate(['freightRate/index'])
    }, err => {
      console.log(err)
    })
  }

  openOrderDetailModal(){
    this.modalService.open(OrderModalComponent)
    .result.then((result)=>{
      this.freightRate.orderDetailId = result.orderDetailId
      this.freightRate.orderDetailRowNo = result.orderDetailRowNo
      this.freightRate.orderHeaderDocumentNo = result.orderHeaderDocumentNo
    })
  }

  backToList() {
    this.route.navigate(['freightRate/index'])
  }

  correctDate(){
    this.freightRate.standardInspectingDateDateDisplay = moment(this.freightRate.standardInspectingDateDate).format('YYYY-MM-DD');
    this.freightRate.inspectingInquiryDateDisplay = moment(this.freightRate.inspectingInquiryDate).format('YYYY-MM-DD');
    this.freightRate.modelInquiryDisplay = moment(this.freightRate.modelInquiry).format('YYYY-MM-DD');
    this.freightRate.environmentInspectingDateDisplay = moment(this.freightRate.environmentInspectingDate).format('YYYY-MM-DD');
    this.freightRate.freightRateDateDisplay = moment(this.freightRate.freightRateDate).format('YYYY-MM-DD');
    this.freightRate.sendDateDisplay = moment(this.freightRate.sendDate).format('YYYY-MM-DD');
    this.freightRate.contractDateDisplay = moment(this.freightRate.contractDate).format('YYYY-MM-DD');
    this.freightRate.environmentInspectingMailDateDisplay = moment(this.freightRate.environmentInspectingMailDate).format('YYYY-MM-DD');
    this.freightRate.tollMailDateDisplay = moment(this.freightRate.tollMailDate).format('YYYY-MM-DD');
    this.freightRate.clearanceCodeDateDisplay = moment(this.freightRate.clearanceCodeDate).format('YYYY-MM-DD');
  }

  fillDate(){
    this.freightRate.standardInspectingDateDate = new Date(this.freightRate.standardInspectingDateDateDisplay)
    this.freightRate.inspectingInquiryDate = new Date(this.freightRate.inspectingInquiryDateDisplay);
    this.freightRate.modelInquiry = new Date(this.freightRate.modelInquiryDisplay);
    this.freightRate.environmentInspectingDate = new Date(this.freightRate.environmentInspectingDateDisplay);
    this.freightRate.freightRateDate = new Date(this.freightRate.freightRateDateDisplay);
    this.freightRate.sendDate = new Date(this.freightRate.sendDateDisplay);
    this.freightRate.contractDate = new Date(this.freightRate.contractDateDisplay);
    this.freightRate.environmentInspectingMailDate = new Date(this.freightRate.environmentInspectingMailDateDisplay);
    this.freightRate.tollMailDate = new Date(this.freightRate.tollMailDateDisplay);
    this.freightRate.clearanceCodeDate = new Date(this.freightRate.clearanceCodeDateDisplay);
  }

}
