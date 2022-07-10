import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, GridApi, GridReadyEvent, SelectionChangedEvent } from 'ag-grid-community';
import { Messages } from 'src/app/framework/utilities/messages/messages';
import { MyDialogBoxComponent } from 'src/app/framework/utilities/my-dialog-box/my-dialog-box.component';
import { OrderHdr } from '../../models/order-hdr.model';
import { Preinvoice } from '../../models/preInvoice.model';
import { OrderHdrService } from '../../services/order-hdr.service';
import { AgentGridComponent } from '../agent/grid/agent-grid.componnent';
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
  formGroup: FormGroup;
  formGroupItm: FormGroup;

  loading = false;

  constructor(private formBuilder: FormBuilder,
    private orderHdrService: OrderHdrService,
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
        const pi = this.childItm.rowData.findIndex(itm => itm.id === id);
        if (pi != -1) {
          this.childItm.rowData.splice(pi, 1, data);
          var rowNode = this.childItm.agGrid.getRowNode('' + pi);
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
      'chassiNo': [null, [Validators.required]],
      'customerName': [null, Validators.required],
      'agentName': [null, [Validators.required]],
      'customerId': [null, []],
      'agentId': [null, []],
      'chassiId': [null, []],
    });

    
  }

  //form validation
  get getDocumentNo() {
    return this.formGroup.get('orderNo') as FormControl
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
      
      this.formGroup.controls['id'].setValue(data['id']);
      this.formGroup.controls['address'].setValue(data['firstName']);

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
    this.formGroup.patchValue(event);
  }


  openDialogOrderHdrList(): void {
    const openDialogOrderHdrListDialogRef = this.dialog.open(OrderHdrGridComponent, {
      panelClass: 'custom-dialog-container',
      width: '600px', height: '400px',
      data: { name: "test", data: [] },
    });
    const dialogSubmitSubscription = openDialogOrderHdrListDialogRef.componentInstance.outputGetFromGridToDialog.subscribe(data => {
      console.log("returned value from dialog: " + data['id']);
      
      this.formGroup.patchValue(data); 

      dialogSubmitSubscription.unsubscribe();
      openDialogOrderHdrListDialogRef.close();
    });
    
  }

  openChassiDialog(){
    const dialogRef = this.dialog.open(CustomerGridComponent, {
      panelClass: 'custom-dialog-container',
      width: '600px', height: '400px',
      data: { name: "test", data: [] },
    });
    const dialogSubmitSubscription = dialogRef.componentInstance.outputGetFromGridToDialog.subscribe(data => {
      console.log("returned value from dialog: " + data['id']);
      
      this.formGroupItm.controls['chassiId'].setValue(data['id']);
      this.formGroupItm.controls['chassiNo'].setValue(data['chassiNo']);

      dialogSubmitSubscription.unsubscribe();
      dialogRef.close();
    });
  }

  openCustomerDialog(){
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

    openAgentDialog(){
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
  addRow() { }
  removeRow() {
  }
}

