import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { defaultTheme, IActiveDate, IDatepickerTheme } from 'ng-persian-datepicker';
import { Observable } from 'rxjs';
import { JalaliMomentDateAdapter } from 'src/app/framework/utilities/datetimepicker/mat-core/jalali-moment-date-adapter';
import { AlertService } from '../../../framework/utilities/alert/alert-service.service';
import { Preinvoice } from '../../models/common/preInvoice.model';
import { PreInvoiceService } from '../../services/pre-invoice.service';
import * as jmoment from 'jalali-moment';

@Component({
  selector: 'app-pre-invoice',
  templateUrl: './pre-invoice.component.html',
  styleUrls: ['./pre-invoice.component.css']
})
export class PreInvoiceComponent implements OnInit {

  formGroup: FormGroup;
  preInvoiceList: Preinvoice[];
  requiredAlert: string = 'این فیلد اجباری است.';

  loading = false;



  uiIsVisible: boolean = false;
  uiTheme: IDatepickerTheme = defaultTheme;
  uiYearView: boolean = true;
  uiMonthView: boolean = true;
  uiHideAfterSelectDate: boolean = false;
  uiHideOnOutsideClick: boolean = false;
  uiTodayBtnEnable: boolean = true;

  timeEnable: boolean = true;
  timeShowSecond: boolean = true;
  timeMeridian: boolean = false;


  private _theme: string = 'default';

  get theme(): string {
    return this._theme;
  }

  onSelect(date: IActiveDate) {
    console.log(date);
  }


//



//




  
  constructor(private formBuilder: FormBuilder,
    private preInvoiceService: PreInvoiceService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.createForm(); 

  }

  onSubmit(formGroup) {

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.formGroup.invalid) {
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
    this.preInvoiceService.create(this.formGroup.value)
        .subscribe(() => {
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
      'id': [0],
      'documentNo': [null, [Validators.required]],
      'fileNo': [null, Validators.required],
      'preOrderUnitValue': [null, [Validators.required]],
      'vchDate': [null, [Validators.required]],
      'validate': ''
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
  { field: 'id'},
  { field: 'documentNo'},
  { field: 'fileNo'},
  { field: 'preOrderUnitValue' },
  { field: 'vchDate' }
];
 
// DefaultColDef sets props common to all Columns
public defaultColDef: ColDef = {
  sortable: true,
  filter: true,
};

// Data that gets displayed in the grid
public rowData$!: Observable<any[]>;

// For accessing the Grid's API
@ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  
 // Example load data from sever
 onGridReady(params: GridReadyEvent) {
  this.rowData$ = this.preInvoiceService.getAll();
}

// Example of consuming Grid Event
onCellClicked( e: CellClickedEvent): void {
  console.log('cellClicked', e);
}
}
