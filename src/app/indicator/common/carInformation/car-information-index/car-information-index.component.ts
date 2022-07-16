import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CarInformation } from 'src/app/indicator/models/common/carInformation.model';
import { CarInformationService } from 'src/app/indicator/services/carInformation.service';

@Component({
  selector: 'app-car-information-index',
  templateUrl: './car-information-index.component.html',
})
export class CarInformationIndexComponent implements OnInit {

  carInformations: Array<CarInformation> = [];

  constructor(private carInformationService: CarInformationService) {

  }

  ngOnInit(): void {
    this.carInformationService.index().subscribe(data => {
      this.carInformations = data;
      this.correctDate();
    })
  }

  correctDate(){
    this.carInformations.forEach(carInformation => {
      carInformation.arriveDocumentsDateDisplay = moment(carInformation.arriveDocumentsDate).format('YYYY-MM-DD');
      carInformation.arriveBoarderDateDisplay = moment(carInformation.arriveBoarderDate).format('YYYY-MM-DD');
    });
  }
}
