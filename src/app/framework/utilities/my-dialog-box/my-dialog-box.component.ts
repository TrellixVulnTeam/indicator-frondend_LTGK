import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColDef, GridApi, GridReadyEvent, SelectionChangedEvent } from 'ag-grid-community';
import { DialogData } from './dialog-data';

@Component({
  selector: 'app-my-dialog-box',
  templateUrl: './my-dialog-box.component.html',
  styleUrls: ['./my-dialog-box.component.css']
})
export class MyDialogBoxComponent {

  constructor(
    public dialogRef: MatDialogRef<MyDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }



  public rowData!: any[];

  // For accessing the Grid's API
  protected agGrid!: GridApi;
  protected agColumnApi!: any;


  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] =this.data.grid.columnDefs;

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = this.data.grid.defaultColDef;

  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.data.grid.onGridReady(params);
    console.log("dddd"+this.rowData);
  }

  onSelectionChanged(event: SelectionChangedEvent): any {
    return this.data.grid.onSelectionChangedRow(event);
  }

  onSelectionChangedClose(event: SelectionChangedEvent): any {
    return this.data.grid.onSelectionChangedClose(event);

  }

}
