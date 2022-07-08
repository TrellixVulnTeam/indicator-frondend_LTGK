import { ColDef, GridApi, GridReadyEvent, SelectionChangedEvent } from "ag-grid-community";

export abstract class AbstractGrid{

    // Data that gets displayed in the grid
    //public rowData$!: Observable<any[]>;

    public rowData!: any[];

    // For accessing the Grid's API
    protected agGrid!: GridApi;
    protected agColumnApi!: any;


    // Each Column Definition results in one Column.
    public columnDefs: ColDef[] = [];

    // DefaultColDef sets props common to all Columns
    public defaultColDef: ColDef = {
        sortable: true,
        filter: true,
        resizable: true,
        floatingFilter: true,

    };

    // Example load data from sever
    onGridReady(params: GridReadyEvent) {
    }

    onSelectionChangedRow(event: SelectionChangedEvent) :any{
    }

    onSelectionChangedClose(event: SelectionChangedEvent):any {
    }

}