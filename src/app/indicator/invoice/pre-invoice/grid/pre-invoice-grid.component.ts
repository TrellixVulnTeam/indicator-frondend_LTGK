import { Component, EventEmitter, Output } from "@angular/core";
import { ColDef, FullWidthCellKeyPressEvent, GridApi, GridReadyEvent, SelectionChangedEvent } from "ag-grid-community";
import { Preinvoice } from "src/app/indicator/models/preInvoice.model";
import { PreInvoiceService } from "src/app/indicator/services/pre-invoice.service";

@Component({
    selector: 'app-pre-invoice-grid',
    templateUrl: './pre-invoice-grid.component.html',
    styleUrls: ['./pre-invoice-grid.component.css']
})
export class PreInvoiceGridComponent {

    constructor(protected service: PreInvoiceService) {}

    @Output() outputGetFromGridToDialog = new EventEmitter<any>();
    @Output() outputGetFromGrid = new EventEmitter<any>();

    // Each Column Definition results in one Column.
    public columnDefs: ColDef[] = [
        { field: 'id', hide: true },
        { field: 'documentNo', headerName: 'شماره درخواست' },
        { field: 'fileNo', headerName: 'شماره فایل' },
        { field: 'preOrderUnitValue', headerName: 'تعداد' },
        { field: 'vchDate', headerName: 'تاریخ' }
      ];

    onSelectionRowChanged(event: SelectionChangedEvent) {
        let pi = new Preinvoice(event.api.getSelectedRows()[0]);
        this.outputGetFromGrid.emit(pi)
    }

    onSelectionChangedClose(event: SelectionChangedEvent): any {
        let pi = new Preinvoice(event.api.getSelectedRows()[0]);
        return pi;
    }

    onRowDoubleClick(event: SelectionChangedEvent) {
        let pii = new Preinvoice(event.api.getSelectedRows()[0]);
        this.outputGetFromGridToDialog.emit(pii)
    }

    // Data that gets displayed in the grid
    public rowData!: any[];

    // For accessing the Grid's API
    protected agGrid!: GridApi;
    protected agColumnApi!: any;

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

    onCellKeyPress(e: FullWidthCellKeyPressEvent) {
        if (e.event) {
            var keyPressed = (e.event as KeyboardEvent).key;
            if (keyPressed === 'Enter') {
                var rowNode = e.node;
                this.outputGetFromGridToDialog.emit(rowNode.data)
            }
        }
    }

    onFilterTextBoxChanged() {
        this.agGrid.setQuickFilter(
            (document.getElementById('filter-text-box') as HTMLInputElement).value
        );
        console.log((document.getElementById('filter-text-box') as HTMLInputElement).value)
    }

}