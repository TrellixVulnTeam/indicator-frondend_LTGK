import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColDef, GridApi, GridReadyEvent, SelectionChangedEvent } from 'ag-grid-community';
import { Messages } from 'src/app/framework/utilities/messages/messages';
import { Agent } from '../../models/agent.model';
import { AgentService } from '../../services/agent.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  formGroup: FormGroup;

  loading = false;

  constructor(private formBuilder: FormBuilder,
    private agentService: AgentService,
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
    this.agentService.create(new Agent(this.formGroup.value))
      .subscribe((data) => {
        this.rowData.push(data);
        this.agGrid.applyTransaction({
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
    this.agentService.update(id, this.formGroup.value)
      .subscribe((data) => {
        const pi = this.rowData.findIndex(itm => itm.id === id);
        if (pi != -1) {
          this.rowData.splice(pi, 1, data);
          var rowNode = this.agGrid.getRowNode('' + pi);
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
      const pi = this.rowData.findIndex(itm => itm.id === id1);
      if (pi != -1) {
        this.agentService.delete(id1).subscribe(() => {
          this.rowData.splice(pi, 1);

          const selectedData = this.agGrid.getSelectedRows();
          this.agGrid.applyTransaction({ remove: selectedData })!;

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
      'firstName': [null, [Validators.required]],
      'lastName': [null, Validators.required],
      'phone': [null, [Validators.required]],
      'address': [null, [Validators.required]],
    });
  }

  
  //form validation
  get getFirstName() {
    return this.formGroup.get('firstName') as FormControl
  }

  getErrorFirstName() {
    return this.formGroup.get('firstName').hasError('required') ? '*' : '';
  }



  //++++++++++++grid

  // Data that gets displayed in the grid
  //public rowData$!: Observable<any[]>;
  public rowData!: any[];

  // For accessing the Grid's API
  private agGrid!: GridApi;
  private agColumnApi!: any;


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
    this.agentService.getAll().subscribe((data) => {
      this.rowData = data;
    });
  }

  refresh() {
    this.agentService.getAll().subscribe((data) => {
      this.rowData = data;
    });
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    let pi = new Agent(event.api.getSelectedRows()[0]);
    this.formGroup.patchValue(pi);
  }


}
