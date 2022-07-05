import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColDef, GridApi, GridReadyEvent, SelectionChangedEvent } from 'ag-grid-community';
import { Messages } from 'src/app/framework/utilities/messages/messages';
import { CarInfo } from '../../models/car-info.model';
import { CarInfoService } from '../../services/car-info-service';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css']
})
export class CarInfoComponent implements OnInit {

  formGroup: FormGroup;

  loading = false;

  constructor(private formBuilder: FormBuilder,
    private carInfoService: CarInfoService,
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
    this.carInfoService.create(new CarInfo(this.formGroup.value))
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
    this.carInfoService.update(id, this.formGroup.value)
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
        this.carInfoService.delete(id1).subscribe(() => {
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
      'chassisNumber': [null, [Validators.required]],
      'engineNumber': [null, Validators.required],
      'carYearModel': [null, [Validators.required]],
      'location': [null, [Validators.required]],
      'arriveDocumentsDate': [null, [Validators.required]],
      'arriveBoarderDate': [null, [Validators.required]],
    });
  }
  //form validation
  get getchassisNumber() {
    return this.formGroup.get('chassisNumber') as FormControl
  }

  getErrorchassisNumber() {
    return this.formGroup.get('chassisNumber').hasError('required') ? '*' : '';
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
    { field: 'chassisNumber', headerName: 'شماره شاسی' },
    { field: 'engineNumber', headerName: 'شماره موتور' },
    { field: 'carYearModel', headerName: 'سال ساخت' },
    { field: 'location', headerName: 'پارکینگ' },
    { field: 'arriveDocumentsDate', headerName: 'تاریخ رسیدن مدارک' },
    { field: 'arriveBoarderDate', headerName: 'تاریخ رسیدن به مرز' }
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
    this.carInfoService.getAll().subscribe((data) => {
      this.rowData = data;
    });
  }

  refresh() {
    this.carInfoService.getAll().subscribe((data) => {
      this.rowData = data;
    });
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    let pi = new CarInfo(event.api.getSelectedRows()[0]);
    this.formGroup.patchValue(pi);
  }


}
