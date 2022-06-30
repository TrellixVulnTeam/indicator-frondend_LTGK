import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pre-invoice',
  templateUrl: './pre-invoice.component.html',
  styleUrls: ['./pre-invoice.component.css']
})
export class PreInvoiceComponent implements OnInit {

  formGroup: FormGroup;
  requiredAlert: string = 'این فیلد اجباری است.';
  post: any = '';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
   // this.setChangeValidate()
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'documentNo': [null, [Validators.required]],
      'fileNo': [null, Validators.required],
      'preOrderUnitValue': [null, [Validators.required]],
      'vchDate': [null, [Validators.required]],
      'validate': ''
    });
  }

  setChangeValidate() {
    this.formGroup.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate == '1') {
          this.formGroup.get('documentNo').setValidators([Validators.required, Validators.minLength(3)]);
        } else {
          this.formGroup.get('documentNo').setValidators(Validators.required);
        }
        this.formGroup.get('documentNo').updateValueAndValidity();
      }
    )
  }

  get name() {
    return this.formGroup.get('documentNo') as FormControl
  } 

  getErrorDocumentNo() {
    return this.formGroup.get('documentNo').hasError('required') ? '*' : '' ;
  }
 
  onSubmit(post) {
    this.post = post;
  }

}
