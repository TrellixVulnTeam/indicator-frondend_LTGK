import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GlobalVariables } from 'src/app/framework/utilities/global/global-variables';
import { Messages } from 'src/app/framework/utilities/messages/messages';
import { environment } from 'src/environments/environment';
import { FreightRate } from '../../models/freight-rate.model';
import { FreightRateService } from '../../services/freight-rate.service';
import { OrderItmGridComponent } from '../order-hdr/grid/itm/order-itm-grid.componnent';
import { FreightRateGridComponent } from './grid/freight-rate-grid.componnent';

@Component({
  selector: 'app-freight-rate',
  templateUrl: './freight-rate.component.html',
  styleUrls: ['./freight-rate.component.css']
})
export class FreightRateComponent implements OnInit {
  
  gv= GlobalVariables.variables;
  
  dateValue 
  
  @ViewChild(FreightRateGridComponent) child;
  formGroup: UntypedFormGroup;

  
  loading = false;
  fromDialogOn= false;

  constructor(private formBuilder: UntypedFormBuilder,
    private freightRateService: FreightRateService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit(formGroup) {

    // stop here if form is invalid
    if (this.formGroup.invalid) {
      console.log("form is invalid");
      return;
    }

    this.loading = true;
    if (!this.formGroup.controls.id.value) {
      this.create();
    } else {
      this.update();
    }
  }

  private create() {
    this.freightRateService.create(new FreightRate(this.formGroup.value))
      .subscribe((data) => {
        this.child.rowData.push(data);
        this.child.agGrid.applyTransaction({
          add: [data]
        })!;
        this.reset();
      })
      .add(() => {
        this.loading = false
        alert(Messages.createRecord);
      });
  }
  private update() {
    var id = this.formGroup.controls.id.value;
    this.freightRateService.update(id, this.formGroup.value)
      .subscribe((data) => {
        const pi = this.child.rowData.findIndex(itm => itm.id === id);
        if (pi != -1) {
          this.child.rowData.splice(pi, 1, data);
          var rowNode = this.child.agGrid.getRowNode('' + pi);
          rowNode?.setData(data);
          this.reset();
        }
      })
      .add(() => {
        this.loading = false
        alert(Messages.updateRecord);
      });
  }

  public delete() {
    var id1 = this.formGroup.controls.id.value;
    var result = confirm(Messages.beforeDelete);
    if (id1 && result) {
      const pi = this.child.rowData.findIndex(itm => itm.id === id1);
      if (pi != -1) {
        this.freightRateService.delete(id1).subscribe(() => {
          this.child.rowData.splice(pi, 1);

          const selectedData = this.child.agGrid.getSelectedRows();
          this.child.agGrid.applyTransaction({ remove: selectedData })!;

          this.reset();
        })
          .add(() => {
            this.loading = false
            alert(Messages.afterDelete);
          });
      }

    }
  }

  reset() {
    this.formGroup.reset();

  } 

  createForm() {
    this.formGroup = this.formBuilder.group({
      'id': [null], 
      'kotaj': [null, [Validators.required]],																					
      'totajDate': [null, [Validators.required]],	 
      'bankingOperationType': [null, []],
      'asnadHamlVaPardakht': [null, []],
      'sendToBankDate': [null, []],
      'greenPass': [null, []],
      'sataCode': [null, []],
      'contractNo': [null, []],
      'contractDate': [null, []],
      'avarezGomroki': [null, []],
      'avarezGomrokiStatus': [null, []],
      'moneyFromCustomer': [null, []],
      'firstInstallmentValue': [null, []],
      'secondInstallmentValue': [null, []],
      'kotajSaderatiMostahlak': [null, []],
      'kotajSaderatiMostahlakInUsd': [null, []],
      'rahdariMailDate': [null, []],
      'mailRahdariToVanak': [null, []],
      'bazres': [null, []],
      'bazdidBazresStandard': [null, []],
      'stelamBazresiBeSherkatDate': [null, []],
      'mailVanakToRahdari': [null, []],
      'mailToBazresiEnvDate': [null, []],
      'envBazdidDate': [null, []],
      'envBazdidPayDate': [null, []],
      'plutionBazdidPayDate': [null, []],
      'plutionBazdidDate': [null, []],
      'mailPlutionAndEnvToRahdariAndShorareNo': [null, []],
      'mailAutomasionEnvInRahdariNo': [null, []],
      'clearanceCodeDate': [null, [Validators.pattern(this.gv.datePattern)]], 
      'orderNo': [null, []],
      'orderItmId': [null, []],
      'chassiNumber': [null, []],
      
    });
  }

  //form validation
  get getDocumentNo() {
    return this.formGroup.get('kotaj') as UntypedFormControl
  }

  getErrorDocumentNo() {
    return this.formGroup.get('kotaj').hasError('required') ? '*' : '';
  }



  openDialogOrderitm(): void {
    this.fromDialogOn= true;
    const dialogRef = this.dialog.open(OrderItmGridComponent, {panelClass: 'custom-dialog-container' ,
      width: '600px',height:'400px',
      data: { name: "test",fromDialog:this.fromDialogOn, data: [] },
    });
    const dialogSubmitSubscription = dialogRef.componentInstance.outputGetFromGridToDialog.subscribe(data => {
      console.log("returned value from dialog: " + data['id']);
      this.formGroup.controls['orderItmId'].setValue(data['id']);
      this.formGroup.controls['chassiNumber'].setValue(data['carInformationChassisNumber']);

      dialogSubmitSubscription.unsubscribe();
      dialogRef.close();
    });
  }



  refresh() {

    this.freightRateService.getAll().subscribe((data) => {
      this.child.rowData = data;
    });

  }
  //to get row from grid component
  onSelectionChanged(event) {
    this.formGroup.patchValue(event);
  }
 

  onBtnExport() {
    this.child.agGrid.exportDataAsCsv();
  }

}

