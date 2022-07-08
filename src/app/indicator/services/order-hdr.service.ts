import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderHdr } from '../models/order-hdr.model';

const  baseUrl = environment.PATH_OF_API+'/api/orderhdr';

@Injectable({
  providedIn: 'root'
})
export class OrderHdrService {
 

  constructor(private http: HttpClient) { }

  getAll(): Observable<OrderHdr[]> {
    console.log(baseUrl);
    return this.http.get<OrderHdr[]>(`${baseUrl}/`);
  }
  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data: OrderHdr): Observable<any> {
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
  findByTitle(title: any): Observable<OrderHdr[]> {
    return this.http.get<OrderHdr[]>(`${baseUrl}?title=${title}`);
  }
}
