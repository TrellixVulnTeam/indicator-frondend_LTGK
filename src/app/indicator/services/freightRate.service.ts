import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { BaseService } from './base.service';
import { FreightRate } from '../models/common/freightRate.model';
import { Observable } from 'rxjs';

const url = `${environment.apiUrl}/api/freightRate/`
@Injectable({
  providedIn: 'root'
})
export class FreightRateService extends BaseService {

  constructor(userAuthService: UserAuthService, httpClient: HttpClient) {
    super(userAuthService, httpClient)
  }

  create(freightRate: FreightRate): Observable<any> {
    return this.http.post(url + "create", freightRate, { headers: this.getHeaders });
  }

  edit(freightRate: FreightRate): Observable<any> {
    return this.http.post(url + "edit", freightRate, { headers: this.getHeaders });
  }

  delete(id: any): Observable<any> {
    return this.http.delete(url + "delete/" + id, { headers: this.getHeaders });
  }

  index(): Observable<any> {
    return this.http.get(url + "getList")
  }

  getbyId(id: any): Observable<any> {
    return this.http.get(url + "getById/" + id)
  }
}
