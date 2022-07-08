import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CellKeyDownEvent, CellKeyPressEvent, ColDef, FullWidthCellKeyDownEvent, FullWidthCellKeyPressEvent, GridApi, GridReadyEvent, SelectionChangedEvent } from "ag-grid-community";
import { Customer } from "../../models/customer.model";
import { CustomerService } from "../../services/customer.service";
import { AbstractGrid } from "./abstract-grid";

@Component({
    selector: 'app-customer-grid',
    templateUrl: './customer-grid.component.html',
    styleUrls: ['./customer-grid.component.css']
})
export class CustomerGridComponent  {

    constructor(protected customerService: CustomerService) {
    }

  @Output() outputGetFromGridToDialog = new EventEmitter<any>();
  @Output() outputGetFromGrid = new EventEmitter<any>();

    // Data that gets displayed in the grid
    //public rowData$!: Observable<any[]>; 
    public rowData!: any[];

    // For accessing the Grid's API
    protected agGrid!: GridApi;
    protected agColumnApi!: any;


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

    onSelectionRowChanged(event: SelectionChangedEvent) {
        let pi = new Customer(event.api.getSelectedRows()[0]);
        this.outputGetFromGrid.emit(pi)
    }

    onSelectionChangedClose(event: SelectionChangedEvent): any {
        let pi = new Customer(event.api.getSelectedRows()[0]);
        return pi;
    }

    onFilterTextBoxChanged() {
        this.agGrid.setQuickFilter(
            (document.getElementById('filter-text-box') as HTMLInputElement).value
        );

        console.log((document.getElementById('filter-text-box') as HTMLInputElement).value)
    }


    onRowDoubleClick(event: SelectionChangedEvent) {
        let pii = new Customer(event.api.getSelectedRows()[0]);
        this.outputGetFromGridToDialog.emit(pii)
    }

    onCellKeyPress(e: FullWidthCellKeyPressEvent) {
        if (e.event) {
          var keyPressed = (e.event as KeyboardEvent).key;
          if (keyPressed === 'Enter') {
            var rowNode = e.node;
            this.outputGetFromGridToDialog.emit(rowNode.data )
          }
        }
      }
    
    /*
    gridDiv.addEventListener('keydown', function(evt) {
        if(editing && evt.key === 'Enter') {
            var currentCell = gridOptions.api.getFocusedCell();
            var finalRowIndex = gridOptions.api.paginationGetRowCount()-1;
      
            // If we are editing the last row in the grid, don't move to next line
            if (currentCell.rowIndex === finalRowIndex) {
                return;
            }
            gridOptions.api.stopEditing();
            gridOptions.api.clearFocusedCell();
      
            gridOptions.api.startEditingCell({
              rowIndex: currentCell.rowIndex + 1,
              colKey: currentCell.column.colId
            });
        }
      });
      */
}