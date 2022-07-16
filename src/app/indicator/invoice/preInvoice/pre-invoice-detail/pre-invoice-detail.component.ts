import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreInvoice } from 'src/app/indicator/models/invoice/preInvoice.model';
import { PreInvoiceService } from 'src/app/indicator/services/preInvoice.service';

@Component({
  selector: 'app-pre-invoice-detail',
  templateUrl: './pre-invoice-detail.component.html'
})
export class PreInvoiceDetailComponent implements OnInit {

  preInvoice: PreInvoice = new PreInvoice();

  constructor(private route: Router, private activateRoute: ActivatedRoute, private preInvoiceService: PreInvoiceService) { }

  ngOnInit(): void {
    let id = this.activateRoute.snapshot.paramMap.get("id");
    this.preInvoiceService.getbyId(id).subscribe(data => {
      this.preInvoice = data;
    }, err => {
      console.log(err)
    })
  }

  backToList() {
    this.route.navigate(['preInvoice/index'])
  }

  delete() {
    this.preInvoiceService.delete(this.preInvoice.id).subscribe(data => {
      console.log(data);
      this.route.navigate(['preInvoice/index'])
    }, err => {
      console.log(err)
    })
  }

}
