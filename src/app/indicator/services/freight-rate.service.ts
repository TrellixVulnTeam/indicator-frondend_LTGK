import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FreightRate } from '../models/freight-rate.model';

const  baseUrl = environment.PATH_OF_API+'/api/freightrate';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
 

  constructor(private http: HttpClient) { }

  getAll(): Observable<FreightRate[]> {
    console.log(baseUrl);
    return this.http.get<FreightRate[]>(`${baseUrl}/`);
  }
  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data: FreightRate): Observable<any> {
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
  findByTitle(title: any): Observable<FreightRate[]> {
    return this.http.get<FreightRate[]>(`${baseUrl}?title=${title}`);
  }
}
