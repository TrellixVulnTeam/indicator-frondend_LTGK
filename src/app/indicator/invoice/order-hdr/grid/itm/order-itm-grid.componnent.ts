import { Component, EventEmitter, Inject, Injector, Input, Output } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ColDef, FullWidthCellKeyPressEvent, GridApi, GridReadyEvent, SelectionChangedEvent } from "ag-grid-community";
import { OrderItm } from "src/app/indicator/models/order-itm.model";
import { OrderItmService } from "src/app/indicator/services/order-itm.service";

@Component({
    selector: 'app-order-itm-grid',
    templateUrl: './order-itm-grid.component.html',
    styleUrls: ['./order-itm-grid.component.css']
})
export class OrderItmGridComponent  {

    
    dialogData: [] ;
    constructor(protected service: OrderItmService,
        private injector: Injector
       // @Inject(MAT_DIALOG_DATA) public dialogData: [] 
    ) {  
    this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
 

    }

   
  @Output() outputGetFromGridToDialog = new EventEmitter<any>();
  @Output() outputGetFromGrid = new EventEmitter<any>();
  @Input() fromDialog: boolean;

    // Data that gets displayed in the grid
    //public rowData$!: Observable<any[]>; 
    public rowData!: any[];

    // For accessing the Grid's API
    protected agGrid!: GridApi;
    protected agColumnApi!: any;


    // Each Column Definition results in one Column.
    public columnDefs: ColDef[] = [
        { field: 'id', hide: true },
        { field: 'orderHdrId', hide: true },
        { field: 'seq', headerName: 'ردیف' },
        { field: 'carInformationChassisNumber', headerName: 'شماره شاسی' },
        { field: 'customerName', headerName: 'مشتری' },
        { field: 'agentName', headerName: 'معرف' },
        { field: 'customerId', headerName: 'customerId' ,hide: true },
        { field: 'agentId', headerName: 'agentId' ,hide: true },
        { field: 'carInformationId', headerName: 'chassiId' ,hide: true },
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
        this.rowData =[] 
        if(this.dialogData && this.dialogData['fromDialog'] && this.dialogData['fromDialog']==true)
          this.service.getAllFreeChassi().subscribe((data) => { this.rowData = data; });
    }
        // Example load data from sever
    reloadGrid() {
        this.service.getAll().subscribe((data) => {
            this.rowData = data;
        });
    }

    resetGrid() {
            this.rowData = [];
    }

    onSelectionRowChanged(event: SelectionChangedEvent) {
        let pi = new  OrderItm(event.api.getSelectedRows()[0]);
        this.outputGetFromGrid.emit(pi)
    }

    onSelectionChangedClose(event: SelectionChangedEvent): any {
        let pi = new  OrderItm(event.api.getSelectedRows()[0]);
        return pi;
    }

    onFilterTextBoxChanged() {
        this.agGrid.setQuickFilter(
            (document.getElementById('filter-text-box') as HTMLInputElement).value
        );

        console.log((document.getElementById('filter-text-box') as HTMLInputElement).value)
    }


    onRowDoubleClick(event: SelectionChangedEvent) {
        let pii = new  OrderItm(event.api.getSelectedRows()[0]);
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
    
}

function MD_DIALOG_DATA(MD_DIALOG_DATA: any) {
    throw new Error("Function not implemented.");
}
