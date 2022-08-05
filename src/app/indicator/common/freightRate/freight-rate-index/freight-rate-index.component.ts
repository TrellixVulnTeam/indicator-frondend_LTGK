import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FreightRate } from 'src/app/indicator/models/common/freightRate.model';
import { FreightRateService } from 'src/app/indicator/services/freightRate.service';

@Component({
  selector: 'app-freight-rate-index',
  templateUrl: './freight-rate-index.component.html'
})
export class FreightRateIndexComponent implements OnInit {

  freightRates: Array<FreightRate> = [];

  constructor(private freightRateService: FreightRateService) { }

  ngOnInit(): void {
    this.freightRateService.index().subscribe(data => {
      this.freightRates = data;
      this.correctDate()
    },err => console.log(err))
  }

  correctDate() {
    this.freightRates.forEach(freightRate => {
      freightRate.freightRateDateDisplay = moment(freightRate.freightRateDate).format('YYYY-MM-DD');
    });
  }

}
