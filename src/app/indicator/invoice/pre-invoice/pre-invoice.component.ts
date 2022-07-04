import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColDef, GridApi, GridReadyEvent, SelectionChangedEvent } from 'ag-grid-community';
import { Messages } from 'src/app/framework/utilities/messages/messages';
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
  preInvoice: Preinvoice;

  loading = false;

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
    this.preInvoiceService.create(new Preinvoice(this.formGroup.value))
      .subscribe((data) => {
        this.rowData.push(data);
        this.agGrid.applyTransaction({
          add: [data]
        })!;
        this.reset();
      })
      .add(() => {
        this.loading = false
        alert(Messages.createRecord);
      });
  }
  private update() {
    var id = this.formGroup.controls.id.value;
    this.preInvoiceService.update(id, this.formGroup.value)
      .subscribe((data) => {
        const pi = this.rowData.findIndex(preinvoice => preinvoice.id === id);
        if (pi != -1) {
          this.rowData.splice(pi, 1, data);
          var rowNode = this.agGrid.getRowNode('' + pi);
          rowNode?.setData(data);
          this.reset();
        }
      })
      .add(() => {
        this.loading = false
        alert(Messages.updateRecord);
      });
  }

  public delete() {
    var id1 = this.formGroup.controls.id.value;
    var result = confirm(Messages.beforeDelete);
    if (id1 && result) {
      const pi = this.rowData.findIndex(preinvoice => preinvoice.id === id1);
      if (pi != -1) {
        this.preInvoiceService.delete(id1).subscribe(() => {
          this.rowData.splice(pi, 1);

          const selectedData = this.agGrid.getSelectedRows();
          this.agGrid.applyTransaction({ remove: selectedData })!;

          this.reset();
        })
          .add(() => {
            this.loading = false
            alert(Messages.afterDelete);
          });
      }

    }
  }

  reset() {
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

  //form validation
  get getDocumentNo() {
    return this.formGroup.get('documentNo') as FormControl
  }

  getErrorDocumentNo() {
    return this.formGroup.get('documentNo').hasError('required') ? '*' : '';
  }



  //++++++++++++grid

  // Data that gets displayed in the grid
  //public rowData$!: Observable<any[]>;
  public rowData!: any[];

  // For accessing the Grid's API
  private agGrid!: GridApi;
  private agColumnApi!: any;


  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'id', hide: true },
    { field: 'documentNo', headerName: 'شماره درخواست' },
    { field: 'fileNo', headerName: 'شماره فایل' },
    { field: 'preOrderUnitValue', headerName: 'تعداد' },
    { field: 'vchDate', headerName: 'تاریخ' }
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: true,

  };

  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.agGrid = params.api;
    this.agColumnApi = params.columnApi;
    this.preInvoiceService.getAll().subscribe((data) => {
      this.rowData = data;
    });
  }

  refresh() {
    this.preInvoiceService.getAll().subscribe((data) => {
      this.rowData = data;
    });
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    let pi = new Preinvoice(event.api.getSelectedRows()[0]);
    this.formGroup.patchValue(pi);
  }


}
