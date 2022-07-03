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
    if (this.formGroup.invalid) {
      console.log("form is invalid");
      return;
    }
    
    this.loading = true;
    if (!this.formGroup.controls.id.value) {
        this.create();
    } else {
        this.update();
    }
  }

  private create() {
    console.log("create");
    this.preInvoiceService.create(new Preinvoice(this.formGroup.value))
        .subscribe((data) => {

          this.rowData.push(data);
          this.agGrid.applyTransaction({
            add: [data]
          })!;

          this.reset();
          this.alertService.success('preInvoice added');
        })
        .add(() => this.loading = false);
}
private update() {
  console.log("update");
    this.preInvoiceService.update(this.formGroup.controls.id.value, this.formGroup.value)
        .subscribe((data) => {
            this.alertService.success('preInvoice updated');

            this.rowData.push(data);
            const res = this.agGrid.applyTransaction({ update: data })!;


        })
        .add(() => this.loading = false);
}
private getAll(){
    
  this.preInvoiceService.getAll().subscribe((result) => {
    this.preInvoiceList = result ? result['data'] : [];
  });
}
public delete(){
  var id1=this.formGroup.controls.id.value;
  var result = confirm("آیا از حذف ردیف مطین هستید؟");
  if(id1 && result){

    //const pi = this.preInvoiceList.findIndex( preinvoice => preinvoice.id === id);
    const pi= this.rowData.findIndex( preinvoice => preinvoice.id === id1);
   
    if (pi != -1){
      this.preInvoiceService.delete(id1).subscribe(() => {
        this.rowData.splice(pi, 1);

        const selectedData = this.agGrid.getSelectedRows();
        this.agGrid.applyTransaction({ remove: selectedData })!;

        this.reset();
        alert('حذف انجام شد.');
      });
    }

  }
}
reset(){
  this.formGroup.reset();

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

  get getDocumentNo() {
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
//public rowData$!: Observable<any[]>;
public rowData!: any[];

// For accessing the Grid's API
//@ViewChild(AgGridAngular) agGrid!: AgGridAngular;
private agGrid!: GridApi;

  
 // Example load data from sever
 onGridReady(params: GridReadyEvent) {
  this.agGrid = params.api;
  this.preInvoiceService.getAll().subscribe((data)=>{
    this.rowData=data;
    console.log(data);
    this.preInvoiceList= data;  
 });
}


// Example of consuming Grid Event
onSelectionChanged(event: SelectionChangedEvent) {
  console.log(event.api.getSelectedRows());
  let pi=new Preinvoice(event.api.getSelectedRows()[0]);
  console.log(pi);
  this.formGroup.patchValue(pi);
}


}
