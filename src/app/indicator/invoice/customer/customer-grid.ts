import { Component } from "@angular/core";
import { ColDef, GridApi, GridReadyEvent, SelectionChangedEvent } from "ag-grid-community";
import { Customer } from "../../models/customer.model";
import { CustomerService } from "../../services/customer.service";
import { AbstractGrid } from "./abstract-grid";
 
export class CustomerGrid extends AbstractGrid {

    constructor(protected customerService: CustomerService) { 
        super();
    }
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

    onSelectionChangedRow(event: SelectionChangedEvent) :any{
        let pi = new Customer(event.api.getSelectedRows()[0]);
        return pi;
    }

    onSelectionChangedClose(event: SelectionChangedEvent):any {
        let pi = new Customer(event.api.getSelectedRows()[0]);
        return pi;
    }


}