import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; 
import { OrderItm } from '../models/order-itm.model';

const  baseUrl = environment.PATH_OF_API+'/api/orderitm';

@Injectable({
  providedIn: 'root'
})
export class OrderItmService {
 

  constructor(private http: HttpClient) { }

  getAll(): Observable<OrderItm[]> {
    console.log(baseUrl);
    return this.http.get<OrderItm[]>(`${baseUrl}/`);
  }

  getAllFreeChassi(): Observable<OrderItm[]> {
    console.log(baseUrl);
    return this.http.get<OrderItm[]>(`${baseUrl}/getfreechassi`);
  }
  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  getAllByHdrId(id: any): Observable<OrderItm[]> {
    return this.http.get<OrderItm[]>(`${baseUrl}/getbyhdrid/${id}`);
  }
   
  create(data: OrderItm): Observable<any> {
    console.log(data);
    return this.http.post(`${baseUrl}/`, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(title: any): Observable<OrderItm[]> {
    return this.http.get<OrderItm[]>(`${baseUrl}?title=${title}`);
  }
}
