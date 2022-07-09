import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { BaseService } from './base.service';
import { Customer } from '../models/common/customer.model';
import { Observable } from 'rxjs';

const url = `${environment.apiUrl}/api/customer/`
@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService {

  constructor(userAuthService: UserAuthService, httpClient: HttpClient) {
    super(userAuthService, httpClient)
  }

  create(customer: Customer): Observable<any>{
    return this.http.post(url+"create",customer,{headers: this.getHeaders});
  }

  edit(customer: Customer): Observable<any>{
    return this.http.post(url+"edit",customer,{headers: this.getHeaders});
  }

  delete(id: any): Observable<any>{
    return this.http.delete(url+"delete/"+id,{headers: this.getHeaders});
  }

  index(): Observable<any>{
    return this.http.get(url +"getList")
  }

  getbyId(id: any): Observable<any>{
    return this.http.get(url +"getById/"+id)
  }
}
