import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { BaseService } from './base.service';
import { OrderHeader } from '../models/invoice/OrderHeader.model';
import { Observable } from 'rxjs';
import { Order } from '../models/invoice/order.model';

const url = `${environment.apiUrl}/api/order/`
@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService {

  constructor(userAuthService: UserAuthService, httpClient: HttpClient) {
    super(userAuthService, httpClient)
  }

  create(order: Order): Observable<any> {
    return this.http.post(url + "create", order, { headers: this.getHeaders });
  }

  edit(OrderHeader: OrderHeader): Observable<any> {
    return this.http.post(url + "edit", OrderHeader, { headers: this.getHeaders });
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

  getPreInvoice(fileNo: String): Observable<any> {
    return this.http.get(url + "getPreInvoice/" + fileNo)
  }

  getSelects(): Observable<any>{
    return this.http.get(url + "getSelects")
  }
}
