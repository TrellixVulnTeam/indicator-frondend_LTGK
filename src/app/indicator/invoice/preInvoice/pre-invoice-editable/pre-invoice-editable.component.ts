import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewActions } from 'src/app/indicator/enums/viewActions';
import { PreInvoice } from 'src/app/indicator/models/invoice/preInvoice.model';
import { PreInvoiceService } from 'src/app/indicator/services/preInvoice.service';

@Component({
  selector: 'app-pre-invoice-editable',
  templateUrl: './pre-invoice-editable.component.html'
})
export class PreInvoiceEditableComponent implements OnInit {

  preInvoice: PreInvoice = new PreInvoice();
  viewAction: ViewActions;

  constructor(private route: Router, private activateRoute: ActivatedRoute, private preInvoiceService: PreInvoiceService) {
    let id = +this.activateRoute.snapshot.paramMap.get("id")
    this.viewAction = this.activateRoute.snapshot.data["viewAction"]

    if (this.viewAction == ViewActions.Edit) {
      this.getById(id);
    }
  }

  ngOnInit(): void {
  }

  getById(id: number) {
    this.preInvoiceService.getbyId(id).subscribe(data => {
      this.preInvoice = data;
    }, err => {
      console.log(err)
    })
  }

  create() {
    this.preInvoiceService.create(this.preInvoice).subscribe(data => {
      console.log(data);
      this.route.navigate(['preInvoice/index'])
    }, err => {
      console.log(err)
    })
  }

  edit() {
    this.preInvoiceService.edit(this.preInvoice).subscribe(data => {
      console.log(data);
      this.route.navigate(['preInvoice/index'])
    }, err => {
      console.log(err)
    })
  }

  backToList() {
    this.route.navigate(['preInvoice/index'])
  }

}
