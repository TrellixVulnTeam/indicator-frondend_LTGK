import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColDef, GridApi, GridReadyEvent, SelectionChangedEvent } from 'ag-grid-community';
import { Messages } from 'src/app/framework/utilities/messages/messages';
import { OrderHdr } from '../../models/order-hdr.model';
import { Preinvoice } from '../../models/preInvoice.model'; 
import { OrderHdrService } from '../../services/order-hdr.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  formGroup: FormGroup;

  loading = false;

  constructor(private formBuilder: FormBuilder,
    private orderHdrService: OrderHdrService,
    ) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit(formGroup) {

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
    this.orderHdrService.create(new OrderHdr(this.formGroup.value))
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
    this.orderHdrService.update(id, this.formGroup.value)
      .subscribe((data) => {
        const pi = this.rowData.findIndex(itm => itm.id === id);
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
        this.orderHdrService.delete(id1).subscribe(() => {
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
    { field: 'documentNo', headerName: 'شماره سفارش' },
    { field: 'invoiceNo', headerName: 'شماره اینویس' },
    { field: 'reagentName', headerName: 'معرف' },
    { field: 'reagentName', headerName: 'معرف' },
    { field: 'vchDate', headerName: 'تاریخ' }
  ];

  id?: number 
  reagentName: string = ""
  customerName: string = ""
  customerId: number | undefined
  invoiceValue: number | undefined
  preInvoiceNo: string =""    
  preInvoiceId: number | undefined
  vchDate: Date = new Date()

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
    this.orderHdrService.getAll().subscribe((data) => {
      this.rowData = data;
    });
  }

  refresh() {
    this.orderHdrService.getAll().subscribe((data) => {
      this.rowData = data;
    });
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    let pi = new Preinvoice(event.api.getSelectedRows()[0]);
    this.formGroup.patchValue(pi);
  }


}
