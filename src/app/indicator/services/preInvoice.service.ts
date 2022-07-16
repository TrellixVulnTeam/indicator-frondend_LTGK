import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { BaseService } from './base.service';
import { PreInvoice } from '../models/invoice/preInvoice.model';
import { Observable } from 'rxjs';

const url = `${environment.apiUrl}/api/preInvoice/`
@Injectable({
  providedIn: 'root'
})
export class PreInvoiceService extends BaseService {

  constructor(userAuthService: UserAuthService, httpClient: HttpClient) {
    super(userAuthService, httpClient)
  }

  create(preInvoice: PreInvoice): Observable<any>{
    return this.http.post(url+"create",preInvoice,{headers: this.getHeaders});
  }

  edit(preInvoice: PreInvoice): Observable<any>{
    return this.http.post(url+"edit",preInvoice,{headers: this.getHeaders});
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
