import { Component, EventEmitter, Output } from "@angular/core";
import { ColDef, FullWidthCellKeyPressEvent, GridApi, GridReadyEvent, SelectionChangedEvent } from "ag-grid-community";
import { Agent } from "src/app/indicator/models/agent.model";
import { AgentService } from "src/app/indicator/services/agent.service";

@Component({
    selector: 'app-agent-grid',
    templateUrl: './agent-grid.component.html',
    styleUrls: ['./agent-grid.component.css']
})
export class AgentGridComponent  {

    constructor(protected service: AgentService) {
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
        this.service.getAll().subscribe((data) => {
            this.rowData = data;
        });
    }

    onSelectionRowChanged(event: SelectionChangedEvent) {
        let pi = new Agent(event.api.getSelectedRows()[0]);
        this.outputGetFromGrid.emit(pi)
    }

    onSelectionChangedClose(event: SelectionChangedEvent): any {
        let pi = new Agent(event.api.getSelectedRows()[0]);
        return pi;
    }

    onFilterTextBoxChanged() {
        this.agGrid.setQuickFilter(
            (document.getElementById('filter-text-box') as HTMLInputElement).value
        );

        console.log((document.getElementById('filter-text-box') as HTMLInputElement).value)
    }


    onRowDoubleClick(event: SelectionChangedEvent) {
        let pii = new Agent(event.api.getSelectedRows()[0]);
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