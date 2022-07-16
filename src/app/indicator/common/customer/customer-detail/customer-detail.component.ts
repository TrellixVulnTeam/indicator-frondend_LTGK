import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/indicator/models/common/customer.model';
import { CustomerService } from 'src/app/indicator/services/customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html'
})
export class CustomerDetailComponent implements OnInit {

  customer: Customer = new Customer();

  constructor(private route: Router, private activateRoute: ActivatedRoute, private customerService: CustomerService) {

  }

  ngOnInit(): void {
    let id = this.activateRoute.snapshot.paramMap.get("id");
    this.customerService.getbyId(id).subscribe(data => {
      this.customer = data;
    }, err => {
      console.log(err)
    })
  }

  backToList() {
    this.route.navigate(['customer/index'])
  }

  delete() {
    this.customerService.delete(this.customer.id).subscribe(data => {
      console.log(data);
      this.route.navigate(['customer/index'])
    }, err => {
      console.log(err)
    })
  }

}
