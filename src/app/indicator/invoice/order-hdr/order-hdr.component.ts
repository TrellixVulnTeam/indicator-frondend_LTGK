import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Messages } from 'src/app/framework/utilities/messages/messages';
import { OrderHdr } from '../../models/order-hdr.model';
import { OrderItm } from '../../models/order-itm.model';
import { OrderHdrService } from '../../services/order-hdr.service';
import { OrderItmService } from '../../services/order-itm.service';
import { AgentGridComponent } from '../agent/grid/agent-grid.componnent';
import { CarInfoGridComponent } from '../car-info/grid/car-info-grid.componnent';
import { CustomerGridComponent } from '../customer/grid/customer-grid.componnent';
import { PreInvoiceGridComponent } from '../pre-invoice/grid/pre-invoice-grid.component';
import { OrderHdrGridComponent } from './grid/hdr/order-hdr-grid.componnent';
import { OrderItmGridComponent } from './grid/itm/order-itm-grid.componnent';

@Component({
  selector: 'app-order-hdr',
  templateUrl: './order-hdr.component.html',
  styleUrls: ['./order-hdr.component.css']
})
export class OrderHdrComponent implements OnInit {

  @ViewChild(OrderHdrGridComponent) childHdr;
  @ViewChild(OrderItmGridComponent) childItm;
  formGroup: UntypedFormGroup;
  formGroupItm: UntypedFormGroup;

  loading = false;

  constructor(private formBuilder: UntypedFormBuilder,
    private orderHdrService: OrderHdrService,
    private orderItmService: OrderItmService,
    public dialog: MatDialog,
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
        this.childItm.rowData.push(data);
        this.childItm.agGrid.applyTransaction({
          add: [data]
        })!;
        // this.reset();
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
      const pi = this.childItm.rowData.findIndex(preinvoice => preinvoice.id === id1);
      if (pi != -1) {
        this.orderHdrService.delete(id1).subscribe(() => {
          this.childItm.rowData.splice(pi, 1);

          const selectedData = this.childItm.agGrid.getSelectedRows();
          this.childItm.agGrid.applyTransaction({ remove: selectedData })!;

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
    this.formGroupItm.reset();
    this.childItm.rowData = [];

  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'id': [null],
      'orderNo': [null, [Validators.required]],
      'invoiceNo': [null, Validators.required],
      'invoiceValue': [null, [Validators.required]],
      'preInvoiceId': [null, []],
      'preInvoiceNo': [null, [Validators.required]],
      'vchDate': [null, [Validators.required]],
    });

    this.formGroupItm = this.formBuilder.group({
      'id': [null],
      'carInformationChassisNumber': [null, [Validators.required]],
      'customerName': [null, Validators.required],
      'agentName': [null, [Validators.required]],
      'customerId': [null, []],
      'agentId': [null, []],
      'carInformationId': [null, []],
      'orderHdrId': [null, []],
    });

  }

  //form validation
  get getDocumentNo() {
    return this.formGroup.get('orderNo') as UntypedFormControl
  }

  getErrorDocumentNo() {
    return this.formGroup.get('orderNo').hasError('required') ? '*' : '';
  }



  openDialogPreInvoiceNo(): void {
    const dialogRef = this.dialog.open(PreInvoiceGridComponent, {
      panelClass: 'custom-dialog-container',
      width: '600px', height: '400px',
      data: { name: "test", data: [] },
    });
    const dialogSubmitSubscription = dialogRef.componentInstance.outputGetFromGridToDialog.subscribe(data => {
      console.log("returned value from dialog: " + data['id']);

      this.formGroup.controls['preInvoiceId'].setValue(data['id']);
      this.formGroup.controls['preInvoiceNo'].setValue(data['documentNo']);

      dialogSubmitSubscription.unsubscribe();
      dialogRef.close();
    });
  }

  refresh() {

    this.orderHdrService.getAll().subscribe((data) => {
      this.childItm.rowData = data;
    });

  }

  //to get row from grid component
  onSelectionItmChanged(event) {
    this.formGroupItm.patchValue(event);
  }

  openDialogOrderHdrList(): void {
    const openDialogOrderHdrListDialogRef = this.dialog.open(OrderHdrGridComponent, {
      panelClass: 'custom-dialog-container',
      width: '600px', height: '400px',
      data: { name: "test", data: [] },
    });
    const dialogSubmitSubscription = openDialogOrderHdrListDialogRef.componentInstance.outputGetFromGridToDialog.subscribe(data => {
      console.log("returned value from dialog: " + data['id']);

      this.orderItmService.getAllByHdrId(data['id']).subscribe((items) => {
        this.childItm.rowData = [];
        this.formGroupItm.reset();
        this.formGroup.reset();
        this.childItm.rowData = items;
        this.formGroup.patchValue(data);

      });


      dialogSubmitSubscription.unsubscribe();
      openDialogOrderHdrListDialogRef.close();
    });

  }

  openChassiDialog() {
    const dialogRef = this.dialog.open(CarInfoGridComponent, {
      panelClass: 'custom-dialog-container',
      width: '600px', height: '400px',
      data: { name: "test", data: [] },
    });
    const dialogSubmitSubscription = dialogRef.componentInstance.outputGetFromGridToDialog.subscribe(data => {
      console.log("returned value from dialog: " + data['id']);

      this.formGroupItm.controls['carInformationId'].setValue(data['id']);
      this.formGroupItm.controls['carInformationChassisNumber'].setValue(data['chassisNumber']);

      dialogSubmitSubscription.unsubscribe();
      dialogRef.close();
    });
  }

  openCustomerDialog() {
    const dialogRef = this.dialog.open(CustomerGridComponent, {
      panelClass: 'custom-dialog-container',
      width: '600px', height: '400px',
      data: { name: "test", data: [] },
    });
    const dialogSubmitSubscription = dialogRef.componentInstance.outputGetFromGridToDialog.subscribe(data => {
      console.log("returned value from dialog: " + data['id']);

      this.formGroupItm.controls['customerId'].setValue(data['id']);
      this.formGroupItm.controls['customerName'].setValue(data['fullName']);

      dialogSubmitSubscription.unsubscribe();
      dialogRef.close();
    });
  }

  openAgentDialog() {
    const dialogRef = this.dialog.open(AgentGridComponent, {
      panelClass: 'custom-dialog-container',
      width: '600px', height: '400px',
      data: { name: "test", data: [] },
    });
    const dialogSubmitSubscription = dialogRef.componentInstance.outputGetFromGridToDialog.subscribe(data => {
      console.log("returned value from dialog: " + data['id']);

      this.formGroupItm.controls['agentId'].setValue(data['id']);
      this.formGroupItm.controls['agentName'].setValue(data['fullName']);

      dialogSubmitSubscription.unsubscribe();
      dialogRef.close();
    });



  }
  addRow() {
    if (this.formGroup.invalid) {
      console.log("form is invalid");
      return;
    }

    if (this.formGroupItm.invalid) {
      console.log("form is invalid");
      return;
    }

    var id = this.formGroup.controls.id.value;
    if (id) {
      this.formGroupItm.controls['orderHdrId'].setValue(id);
    }
    else {
      return;
    }

    let orderItm = new OrderItm(this.formGroupItm.value);
    if (orderItm.id) {
      this.orderItmService.update(orderItm.id,orderItm)
        .subscribe((data) => {

          const pi = this.childItm.rowData.findIndex(itm => itm.id === orderItm.id);
          if (pi != -1) {
            this.childItm.rowData.splice(pi, 1, data);
            var rowNode = this.childItm.agGrid.getRowNode('' + pi);
            rowNode?.setData(data);
            //this.reset();
          }

          this.formGroupItm.reset();
        })
        .add(() => {
          this.loading = false
          alert(Messages.createRecord);
        });
    } else {
      orderItm.seq=this.childItm.rowData.length+1;
      this.orderItmService.create(orderItm)
        .subscribe((data) => {
          this.childItm.rowData.push(data);
          this.childItm.agGrid.applyTransaction({
            add: [data]
          })!;
          this.formGroupItm.reset();
        })
        .add(() => {
          this.loading = false
          alert(Messages.createRecord);
        });
    }

  }
  removeRow() {
    var id1 = this.formGroupItm.controls.id.value;
    var result = confirm(Messages.beforeDelete);
    if (id1 && result) {
      const pi = this.childItm.rowData.findIndex(itm => itm.id === id1);
      if (pi != -1) {
        this.orderItmService.delete(id1).subscribe(() => {

          this.childItm.reloadGrid();
          /*
          this.childItm.rowData.splice(pi, 1);
          const selectedData = this.childItm.agGrid.getSelectedRows();
          this.childItm.agGrid.applyTransaction({ remove: selectedData })!;

          for(let i=0;i<this.childItm.rowData.length;i++){
            this.childItm.rowData[i]["seq"]=i+1;
          }
*/
          this.formGroupItm.reset();
        })
          .add(() => {
            this.loading = false
            alert(Messages.afterDelete);
          });
      }

    }
  }
}

