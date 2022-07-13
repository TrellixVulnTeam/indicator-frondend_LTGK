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
        { field: 'kotaj', headerName:  'کوتاژ' },
        { field: 'totajDate', headerName:  'تاریخ کوتاژ' },
        { field: 'chassiNumber', headerName:  'شماره شاسی' },
        { field: 'bankingOperationType', headerName:  'نوع عملیات بانکی' },
        { field: 'asnadHamlVaPardakht', headerName:  'پارت اسناد حمل و ابزار پرداخت' },
        { field: 'sendToBankDate', headerName:  'ارسال به بانک' },
        { field: 'greenPass', headerName:  'برگ سبز' },
        { field: 'sataCode', headerName:  'کد ساتا' },
        { field: 'contractNo', headerName:  'شماره قرارداد' },
        { field: 'contractDate', headerName:  'تاریخ قرارداد' },
        { field: 'avarezGomroki', headerName:  'مبلغ حقوق و عوارض گمرکی' },
        { field: 'avarezGomrokiStatus', headerName:  'وضعیت حقوق و عوارض گمرکی' },
        { field: 'moneyFromCustomer', headerName:  'مبلغ قابل دریافت از مشتری' },
        { field: 'firstInstallmentValue', headerName:  'مبلغ قابل دریافت از مشتری قسط اول' },
        { field: 'secondInstallmentValue', headerName:  'مبلغ قابل دریافت از مشتری قسط دوم' },
        { field: 'kotajSaderatiMostahlak', headerName:  'کوتاژ صادراتی مستهلک شده' },
        { field: 'kotajSaderatiMostahlakInUsd', headerName:  'معادل دلاری مستهلک شده' },
        { field: 'rahdariMailDate', headerName:  'نامه به راهداری' },
        { field: 'mailRahdariToVanak', headerName:  '"نامه راهداری به ونک استانداهت انتخاب بازرس"' },
        { field: 'bazres', headerName:  'انتخاب بازرس' },
        { field: 'bazdidBazresStandard', headerName:  'بازدید بازرس استاندارد' },
        { field: 'stelamBazresiBeSherkatDate', headerName:  'جواب استعلام بازرسی به شرکت' },
        { field: 'mailVanakToRahdari', headerName:  'شماره نامه ونک به راهداری ، گمرک و شماره گذاری' },
        { field: 'mailToBazresiEnvDate', headerName:  'نامه به شرکت بازرسی محیط زیست' },
        { field: 'envBazdidDate', headerName:  'بازدید محیط زیست' },
        { field: 'envBazdidPayDate', headerName:  'پرداخت دستمزد بازرسی محیط زیست' },
        { field: 'plutionBazdidPayDate', headerName:  'پرداخت دستمزد بازرسی آلایندگی' },
        { field: 'plutionBazdidDate', headerName:  'بازدید آلایند' },
        { field: 'mailPlutionAndEnvToRahdariAndShorareNo', headerName:  'شماره نامه آلایندگی و محیط زیست به راهداری و شماره گذاری' },
        { field: 'mailAutomasionEnvInRahdariNo', headerName:  'شماره نامه اتوماسیون محیط زیست در راهداری' },
        { field: 'clearanceCodeDate', headerName:  'اعلام کد ترخیص' },	
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