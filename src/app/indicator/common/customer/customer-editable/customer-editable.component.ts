import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Customer } from 'src/app/indicator/models/common/customer.model';
import { CustomerService } from 'src/app/indicator/services/customer.service';

@Component({
  selector: 'app-customer-editable',
  templateUrl: './customer-editable.component.html'
})
export class CustomerEditableComponent implements OnInit {

  customer: Customer = new Customer();
  
  constructor(private route: Router,private customerService: CustomerService) { 

  }

  ngOnInit(): void {
  }

  create(){
    this.customerService.create(this.customer).subscribe(data => {
      console.log(data);
      this.route.navigate(['customer/index'])},err =>{
        console.log(err)
      })
  }

  backToList() {
    this.route.navigate(['customer/index'])
  }
}
