import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Preinvoice } from '../models/common/preInvoice.model';

const  baseUrl = environment.PATH_OF_API+'/api/preInvoice';

@Injectable({
  providedIn: 'root'
})
export class PreInvoiceService {

 baseUrl = environment.PATH_OF_API+'/api/preInvoice';

  constructor(private http: HttpClient) { }
  getAll(): Observable<Preinvoice[]> {
    return this.http.get<Preinvoice[]>(baseUrl);
  }
  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
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
  findByTitle(title: any): Observable<Preinvoice[]> {
    return this.http.get<Preinvoice[]>(`${baseUrl}?title=${title}`);
  }
}
