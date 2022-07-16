import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { CarInformation } from 'src/app/indicator/models/common/carInformation.model';
import { CarInformationService } from 'src/app/indicator/services/carInformation.service';

@Component({
  selector: 'app-car-information-detail',
  templateUrl: './car-information-detail.component.html'
})
export class CarInformationDetailComponent implements OnInit {

  carInformation: CarInformation = new CarInformation();

  constructor(private route: Router, private activateRoute: ActivatedRoute, private carInformationService: CarInformationService) {

  }

  ngOnInit(): void {
    let id = this.activateRoute.snapshot.paramMap.get("id");
    this.carInformationService.getbyId(id).subscribe(data => {
      this.carInformation = data;
      this.correctDate()
    }, err => {
      console.log(err)
    })
  }

  backToList() {
    this.route.navigate(['carInformation/index'])
  }

  delete() {
    this.carInformationService.delete(this.carInformation.id).subscribe(data => {
      console.log(data);
      this.route.navigate(['carInformation/index'])
    }, err => {
      console.log(err)
    })
  }

  correctDate() {
    this.carInformation.arriveDocumentsDateDisplay = moment(this.carInformation.arriveDocumentsDate).format('YYYY-MM-DD');
    this.carInformation.arriveBoarderDateDisplay = moment(this.carInformation.arriveBoarderDate).format('YYYY-MM-DD');
  }

}
