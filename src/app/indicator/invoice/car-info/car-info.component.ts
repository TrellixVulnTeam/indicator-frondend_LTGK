import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ColDef, GridApi, GridReadyEvent, SelectionChangedEvent } from 'ag-grid-community';
import { Messages } from 'src/app/framework/utilities/messages/messages';
import { CarInfo } from '../../models/car-info.model';
import { CarInfoService } from '../../services/car-info-service';
import { CarInfoGridComponent } from './grid/car-info-grid.componnent';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css']
})
export class CarInfoComponent implements OnInit {
  @ViewChild(CarInfoGridComponent) child;

  formGroup: UntypedFormGroup;

  loading = false;

  constructor(private formBuilder: UntypedFormBuilder,
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
    this.carInfoService.update(id, this.formGroup.value)
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
      const pi = this.child.rowData.findIndex(preinvoice => preinvoice.id === id1);
      if (pi != -1) {
        this.carInfoService.delete(id1).subscribe(() => {
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
    return this.formGroup.get('chassisNumber') as UntypedFormControl
  }

  getErrorchassisNumber() {
    return this.formGroup.get('chassisNumber').hasError('required') ? '*' : '';
  }


  refresh() {

    this.carInfoService.getAll().subscribe((data) => {
      this.child.rowData = data;
    });

  }

  //to get row from grid component
  onSelectionChanged(event) {
    this.formGroup.patchValue(event);
  }

}
