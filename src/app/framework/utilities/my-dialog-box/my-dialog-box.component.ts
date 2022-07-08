import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColDef, GridApi, GridReadyEvent, SelectionChangedEvent } from 'ag-grid-community';
import { CustomerGridComponent } from 'src/app/indicator/invoice/customer/customer-grid.componnent';
import { DialogData } from './dialog-data';

@Component({
  selector: 'app-my-dialog-box',
  templateUrl: './my-dialog-box.component.html',
  styleUrls: ['./my-dialog-box.component.css']
})
export class MyDialogBoxComponent {

  constructor(
    public dialogRef: MatDialogRef<CustomerGridComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }



}
