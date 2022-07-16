import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ViewActions } from 'src/app/indicator/enums/viewActions';
import { CarInformation } from 'src/app/indicator/models/common/carInformation.model';
import { CarInformationService } from 'src/app/indicator/services/carInformation.service';

@Component({
  selector: 'app-car-information-editable',
  templateUrl: './car-information-editable.component.html'
})
export class CarInformationEditableComponent implements OnInit {

  carInformation: CarInformation = new CarInformation();
  viewAction: ViewActions;

  constructor(private route: Router, private activateRoute: ActivatedRoute, private carInformationService: CarInformationService) {
    let id = +this.activateRoute.snapshot.paramMap.get("id")
    this.viewAction = this.activateRoute.snapshot.data["viewAction"]

    if (this.viewAction == ViewActions.Edit) {
      this.getById(id);
    }
  }

  ngOnInit(): void {
  }

  getById(id: number) {
    this.carInformationService.getbyId(id).subscribe(data => {
      this.carInformation = data;
      this.correctDate()
    }, err => {
      console.log(err)
    })
  }

  create() {
    this.fillDate()
    this.carInformationService.create(this.carInformation).subscribe(() => {
      this.route.navigate(['carInformation/index'])
    }, err => {
      console.log(err)
    })
  }

  edit() {
    this.fillDate()
    this.carInformationService.edit(this.carInformation).subscribe(() => {
      this.route.navigate(['carInformation/index'])
    }, err => {
      console.log(err)
    })
  }

  backToList() {
    this.route.navigate(['carInformation/index'])
  }

  correctDate(){
    this.carInformation.arriveDocumentsDateDisplay = moment(this.carInformation.arriveDocumentsDate).format('YYYY-MM-DD');
    this.carInformation.arriveBoarderDateDisplay = moment(this.carInformation.arriveBoarderDate).format('YYYY-MM-DD');
  }

  fillDate(){
    this.carInformation.arriveDocumentsDate = new Date(this.carInformation.arriveDocumentsDateDisplay)
    this.carInformation.arriveBoarderDate = new Date(this.carInformation.arriveBoarderDateDisplay);
  }
}
