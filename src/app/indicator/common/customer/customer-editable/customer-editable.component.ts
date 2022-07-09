import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/indicator/models/common/customer.model';
import { CustomerService } from 'src/app/indicator/services/customer.service';
import 'src/app/indicator/services/shared.service';

@Component({
  selector: 'app-customer-editable',
  templateUrl: './customer-editable.component.html'
})
export class CustomerEditableComponent implements OnInit {

  customer: Customer = new Customer();
  editMode: boolean = false;

  constructor(private route: Router, private activateRoute: ActivatedRoute, private customerService: CustomerService) {
    let id = +this.activateRoute.snapshot.paramMap.get("id")
    
    if (id.isDefined()) {
      this.editMode = true;
      this.getById(id);
    }
  }

  ngOnInit(): void {
  }

  getById(id: number) {
    this.customerService.getbyId(id).subscribe(data => {
      this.customer = data;
    }, err => {
      console.log(err)
    })
  }

  create() {
    this.customerService.create(this.customer).subscribe(data => {
      console.log(data);
      this.route.navigate(['customer/index'])
    }, err => {
      console.log(err)
    })
  }

  edit() {
    this.customerService.edit(this.customer).subscribe(data => {
      console.log(data);
      this.route.navigate(['customer/index'])
    }, err => {
      console.log(err)
    })
  }

  backToList() {
    this.route.navigate(['customer/index'])
  }

}
