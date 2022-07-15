import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { GlobalVariables } from 'src/app/framework/utilities/global/global-variables';
import { Messages } from 'src/app/framework/utilities/messages/messages';
import { Preinvoice } from '../../models/preInvoice.model';
import { PreInvoiceService } from '../../services/pre-invoice.service';
import { PreInvoiceGridComponent } from './grid/pre-invoice-grid.component';

@Component({
  selector: 'app-pre-invoice',
  templateUrl: './pre-invoice.component.html',
  styleUrls: ['./pre-invoice.component.css']
})
export class PreInvoiceComponent implements OnInit {

  gv= GlobalVariables.variables;

  @ViewChild(PreInvoiceGridComponent) gridChild;

  formGroup: UntypedFormGroup;

  loading = false;

  constructor(private formBuilder: UntypedFormBuilder,
    private preInvoiceService: PreInvoiceService) { }

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
    this.preInvoiceService.create(new Preinvoice(this.formGroup.value))
      .subscribe((data) => {
        this.gridChild.rowData.push(data);
        this.gridChild.agGrid.applyTransaction({
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
        const pi = this.gridChild.rowData.findIndex(itm => itm.id === id);
        if (pi != -1) {
          this.gridChild.rowData.splice(pi, 1, data);
          var rowNode = this.gridChild.agGrid.getRowNode('' + pi);
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
      const pi = this.gridChild.rowData.findIndex(preinvoice => preinvoice.id === id1);
      if (pi != -1) {
        this.preInvoiceService.delete(id1).subscribe(() => {
          this.gridChild.rowData.splice(pi, 1);

          const selectedData = this.gridChild.gGrid.getSelectedRows();
          this.gridChild.agGrid.applyTransaction({ remove: selectedData })!;

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
    return this.formGroup.get('documentNo') as UntypedFormControl
  }

  getErrorDocumentNo() {
    return this.formGroup.get('documentNo').hasError('required') ? '*' : '';
  }
  refresh() {

    this.preInvoiceService.getAll().subscribe((data) => {
      this.gridChild.rowData = data;
    });

  }
  //to get row from grid component
  onSelectionChanged(event) {
    this.formGroup.patchValue(event);
  }




}
