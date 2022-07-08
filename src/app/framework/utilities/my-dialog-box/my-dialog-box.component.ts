import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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



}
