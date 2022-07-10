import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColDef, GridApi, GridReadyEvent, SelectionChangedEvent } from 'ag-grid-community';
import { Messages } from 'src/app/framework/utilities/messages/messages';
import { Agent } from '../../models/agent.model';
import { AgentService } from '../../services/agent.service';
import { AgentGridComponent } from './grid/agent-grid.componnent';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
  @ViewChild(AgentGridComponent) child;

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
    this.agentService.update(id, this.formGroup.value)
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
        this.agentService.delete(id1).subscribe(() => {
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



  refresh() {

    this.agentService.getAll().subscribe((data) => {
      this.child.rowData = data;
    });

  }

  //to get row from grid component
  onSelectionChanged(event) {
    this.formGroup.patchValue(event);
  }


}
