import { Component, EventEmitter, Output } from "@angular/core";
import { ColDef, FullWidthCellKeyPressEvent, GridApi, GridReadyEvent, SelectionChangedEvent } from "ag-grid-community";
import { FreightRate } from "src/app/indicator/models/freight-rate.model";
import { FreightRateService } from "src/app/indicator/services/freight-rate.service";

@Component({
    selector: 'app-freight-rate-grid',
    templateUrl: './freight-rate-grid.component.html',
    styleUrls: ['./freight-rate-grid.component.css']
})
export class FreightRateGridComponent  {

    constructor(protected service: FreightRateService) {
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
        { field: 'freigtRateNo', headerName: '' },																						
        { field: 'freigtRateDate', headerName: '' },																						
        { field: 'importExport', headerName: '' },																						
        { field: 'paymentMethod', headerName: '' },																						
        { field: 'sendDate', headerName: '' },																						
        { field: 'hasGreenCard', headerName: '' },																						
        { field: 'sataCode', headerName: '' },																						
        { field: 'contractNo', headerName: '' },																						
        { field: 'contractDate', headerName: '' },																						
        { field: 'taxAndDutyValue', headerName: '' },																						
        { field: 'isPaidTaxAndDuty', headerName: '' },																						
        { field: 'cutomerPayableValue', headerName: '' },																						
        { field: 'firstInstallmentValue', headerName: '' },																						
        { field: 'secondInstallmentValue', headerName: '' },																						
        { field: 'amorizedFreigtRateValue', headerName: '' },																						
        { field: 'tollMailDate', headerName: '' },																						
        { field: 'amorizedFreigtRateNo', headerName: '' },																						
        { field: 'hasMailToVanak', headerName: '' },																						
        { field: 'inspector', headerName: '' },																						
        { field: 'vanakTollNo', headerName: '' },																						
        { field: 'tollStandardMailNo', headerName: '' },																						
        { field: 'isDoneStandardInspecting', headerName: '' },																						
        { field: 'isDoneInspectingResult', headerName: '' },																						
        { field: 'hasVanakInvoiceRequest', headerName: '' },																						
        { field: 'isVanakPaid', headerName: '' },																						
        { field: 'hasTollStandardMail', headerName: '' },																						
        { field: 'isEnviroimentPaid', headerName: '' },																						
        { field: 'isPolutionPaid', headerName: '' },																						
        { field: 'isDonePolutionInspecting', headerName: '' },																						
        { field: 'standardInspectingDateDate', headerName: '' },																						
        { field: 'inspectingInquiryDate', headerName: '' },																						
        { field: 'modelInquiry', headerName: '' },																						
        { field: 'enviroimentIspectingMailDate', headerName: '' },																						
        { field: 'enviroimentInspectingDate', headerName: '' },																						
        { field: 'clearanceCodeDate', headerName: '' },																						
        { field: 'enviroPolutionMailNo', headerName: '' },																						
        { field: 'enviromentMailNo', headerName: '' },																						
        { field: 'companyToTollMailNo', headerName: '' },																						
        { field: 'orderItmId', headerName: '' },																						
        { field: 'orderHdrNo', headerName: '' },		
    ];

    freigtRateNo: string = ""
    freigtRateDate: Date = new Date() 
    importExport: boolean
    paymentMethod: string = "" 
    sendDate: Date = new Date() 
    hasGreenCard: boolean
    sataCode: string = "" 
    contractNo: string = "" 
    contractDate: Date = new Date()
    taxAndDutyValue:number
    isPaidTaxAndDuty: boolean
    cutomerPayableValue:number
    firstInstallmentValue:number
    secondInstallmentValue:number
    amorizedFreigtRateValue:number
    tollMailDate: Date = new Date()

    amorizedFreigtRateNo: string = "" 
    hasMailToVanak: boolean
    inspector: string = "" 
    vanakTollNo: string = "" 
    tollStandardMailNo: string = "" 
    isDoneStandardInspecting: boolean
    isDoneInspectingResult: boolean
    hasVanakInvoiceRequest: boolean
    isVanakPaid: boolean
    hasTollStandardMail: boolean
    isEnviroimentPaid: boolean
    isPolutionPaid: boolean
    isDonePolutionInspecting: boolean
    standardInspectingDateDate: Date = new Date()
    inspectingInquiryDate: Date = new Date()
    modelInquiry: Date = new Date()
    enviroimentIspectingMailDate: Date = new Date()
    enviroimentInspectingDate: Date = new Date()
    clearanceCodeDate: Date = new Date()
    enviroPolutionMailNo: string = "" 
    enviromentMailNo: string = "" 
    companyToTollMailNo: string = ""
     
    orderItmId: number 
    orderHdrNo: string = ""
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
        let pi = new FreightRate(event.api.getSelectedRows()[0]);
        this.outputGetFromGrid.emit(pi)
    }

    onSelectionChangedClose(event: SelectionChangedEvent): any {
        let pi = new FreightRate(event.api.getSelectedRows()[0]);
        return pi;
    }

    onFilterTextBoxChanged() {
        this.agGrid.setQuickFilter(
            (document.getElementById('filter-text-box') as HTMLInputElement).value
        );

        console.log((document.getElementById('filter-text-box') as HTMLInputElement).value)
    }


    onRowDoubleClick(event: SelectionChangedEvent) {
        let pii = new FreightRate(event.api.getSelectedRows()[0]);
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