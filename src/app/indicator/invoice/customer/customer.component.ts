import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Messages } from 'src/app/framework/utilities/messages/messages';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { CustomerGridComponent } from './customer-grid.componnent';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  @ViewChild(CustomerGridComponent) child;

  formGroup: FormGroup;

  loading = false;

  constructor(private formBuilder: FormBuilder,
    private customerService: CustomerService,
    public dialog: MatDialog
  ) {

  }

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
    this.customerService.create(new Customer(this.formGroup.value))
      .subscribe((data) => {
        this.child.rowData.push(data);
        this.child.agGrid.applyTransaction({
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
    this.customerService.update(id, this.formGroup.value)
      .subscribe((data) => {
        const pi = this.child.rowData.findIndex(itm => itm.id === id);
        if (pi != -1) {
          this.child.rowData.splice(pi, 1, data);
          var rowNode = this.child.agGrid.getRowNode('' + pi);
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
      const pi = this.child.rowData.findIndex(itm => itm.id === id1);
      if (pi != -1) {
        this.customerService.delete(id1).subscribe(() => {
          this.child.rowData.splice(pi, 1);

          const selectedData = this.child.agGrid.getSelectedRows();
          this.child.agGrid.applyTransaction({ remove: selectedData })!;

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
      'firstName': [null, [Validators.required]],
      'lastName': [null, Validators.required],
      'phone': [null, [Validators.required]],
      'address': [null, [Validators.required]],
    });
  }

  //form validation
  get getFirstName() {
    return this.formGroup.get('firstName') as FormControl
  }

  getErrorFirstName() {
    return this.formGroup.get('firstName').hasError('required') ? '*' : '';
  }

  refresh() {

    this.customerService.getAll().subscribe((data) => {
      this.child.rowData = data;
    });

  }

  //to get row from grid component
  onSelectionChanged(event) {
    this.formGroup.patchValue(event);
  }
  

  openDialog(): void {
    const dialogRef = this.dialog.open(CustomerGridComponent, {panelClass: 'custom-dialog-container' ,
      width: '600px',height:'400px',
      data: { name: "test", data: [] },
    });
    const dialogSubmitSubscription = dialogRef.componentInstance.outputGetFromGridToDialog.subscribe(data => {
      console.log("returned value from dialog: " + data['id']);
      this.formGroup.controls['id'].setValue(data['id']);
      this.formGroup.controls['address'].setValue(data['firstName']);
      
      dialogSubmitSubscription.unsubscribe();
      dialogRef.close();
    });

  }


  /*
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
    { field: 'firstName', headerName: 'نام' },
    { field: 'lastName', headerName: 'نام خانوادگی' },
    { field: 'phone', headerName: 'تلفن' },
    { field: 'address', headerName: 'نشانی' },
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
    this.customerService.getAll().subscribe((data) => {
      this.rowData = data;
    });
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    let pi = new Customer(event.api.getSelectedRows()[0]);
    this.formGroup.patchValue(pi);
  }
*/

}
