import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalVariables } from 'src/app/framework/utilities/global/global-variables';
import { TotalReportGridComponent } from './grid/total-report-grid.componnent';

@Component({
  selector: 'app-total-report',
  templateUrl: './total-report.component.html',
  styleUrls: ['./total-report.component.css']
})
export class TotalReportComponent implements OnInit {
  
  gv= GlobalVariables.variables;
  
  @ViewChild(TotalReportGridComponent) gridChild;
  constructor(
    ) { }

  ngOnInit() {
  }
  onBtnExport() {
    this.gridChild.agGrid.exportDataAsCsv();
  }
}

