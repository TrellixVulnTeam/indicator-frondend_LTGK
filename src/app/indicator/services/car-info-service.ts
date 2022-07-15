import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarInfo } from '../models/car-info.model';

const  baseUrl = environment.PATH_OF_API+'/api/carinformation';

@Injectable({
  providedIn: 'root'
})
export class CarInfoService {
 

  constructor(private http: HttpClient) { }

  getAll(): Observable<CarInfo[]> {
    console.log(baseUrl);
    return this.http.get<CarInfo[]>(`${baseUrl}/`);
  }

  getAllFreeChassi(): Observable<CarInfo[]> {
    console.log(baseUrl);
    return this.http.get<CarInfo[]>(`${baseUrl}/getfreechassi`);
  }
  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data: CarInfo): Observable<any> {
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
  findByTitle(title: any): Observable<CarInfo[]> {
    return this.http.get<CarInfo[]>(`${baseUrl}?title=${title}`);
  }
}
