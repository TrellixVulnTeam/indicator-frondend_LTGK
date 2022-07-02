import { SelectionChange } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridApi, GridReadyEvent, SelectionChangedEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AlertService } from '../../../framework/utilities/alert/alert-service.service';
import { Preinvoice } from '../../models/common/preInvoice.model';
import { PreInvoiceService } from '../../services/pre-invoice.service';

@Component({
  selector: 'app-pre-invoice',
  templateUrl: './pre-invoice.component.html',
  styleUrls: ['./pre-invoice.component.css']
})
export class PreInvoiceComponent implements OnInit {

  formGroup: FormGroup;
  preInvoiceList: Preinvoice[];
  preInvoice: Preinvoice;
  requiredAlert: string = 'این فیلد اجباری است.';

  loading = false;

  constructor(private formBuilder: FormBuilder,
    private preInvoiceService: PreInvoiceService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.createForm(); 
    this.getAll();
  }

  onSubmit(formGroup) {

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    /*
    if (this.formGroup.invalid) {
      console.log("for is invalid");
      return;
    }
    */
    this.loading = true;
    if (!this.formGroup.controls.id.value) {
        this.create();
    } else {
        this.update();
    }
  }

  private create() {
    this.preInvoiceService.create(new Preinvoice(this.formGroup.value))
        .subscribe((data) => {
          console.log(data);
          //this.preInvoiceList.add(data);
          this.alertService.success('preInvoice added');
        })
        .add(() => this.loading = false);
}

private update() {
    this.preInvoiceService.update(this.formGroup.controls.id.value, this.formGroup.value)
        .subscribe(() => {
            this.alertService.success('preInvoice updated');
        })
        .add(() => this.loading = false);
}


getAll(){
    
  this.preInvoiceService.getAll().subscribe((result) => {
    this.preInvoiceList = result ? result['data'] : [];
  });
}
delete(){
  var id=this.formGroup.controls.id.value;
  var result = confirm("آیا از حذف ردیف مطین هستید؟");
  if(id && result){
    
    const pi = this.preInvoiceList.findIndex( (preinvoice) => {preinvoice.id === id});
   
    if (pi != -1){
    this.preInvoiceList.splice(pi, 1);
    }

    this.preInvoiceService.delete(id).subscribe(() => {
      this.reset();
      alert('حذف انجام شد.');
    });
  }
}

reset(){
  this.formGroup.reset();
  this.formGroup.controls.is_active.setValue(1);

}



  createForm() {
    this.formGroup = this.formBuilder.group({
      'id': [null],
      'documentNo': [null, [Validators.required]],
      'fileNo': [null, Validators.required],
      'preOrderUnitValue': [null, [Validators.required]],
      'vchDate': [null, [Validators.required]],
    });
  }

  get name() {
    return this.formGroup.get('documentNo') as FormControl
  } 

  getErrorDocumentNo() {
    return this.formGroup.get('documentNo').hasError('required') ? '*' : '' ;
  }
 
  //grid

 // Each Column Definition results in one Column.
 public columnDefs: ColDef[] = [
  { field: 'id',hide:true},
  { field: 'documentNo',headerName: 'شماره درخواست'},
  { field: 'fileNo',headerName: 'شماره فایل'},
  { field: 'preOrderUnitValue' ,headerName: 'تعداد'},
  { field: 'vchDate' ,headerName: 'تاریخ'}
];
 
// DefaultColDef sets props common to all Columns
public defaultColDef: ColDef = {
  sortable: true,
  filter: true,
  resizable: true,
  floatingFilter: true,

};

// Data that gets displayed in the grid
public rowData$!: Observable<any[]>;

// For accessing the Grid's API
//@ViewChild(AgGridAngular) agGrid!: AgGridAngular;
private agGrid!: GridApi;

  
 // Example load data from sever
 onGridReady(params: GridReadyEvent) {
  this.agGrid = params.api;

  this.rowData$ = this.preInvoiceService.getAll();
}

// Example of consuming Grid Event
 
onSelectionChanged(event: SelectionChangedEvent) {
  console.log(event.api.getSelectedRows());
}


}
