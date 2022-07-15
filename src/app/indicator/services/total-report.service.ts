import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; 
import { TotalReport } from '../models/total-report.model';

const  baseUrl = environment.PATH_OF_API+'/api/totalreport';

@Injectable({
  providedIn: 'root'
})
export class TotalReportService {
 

  constructor(private http: HttpClient) { }

  getAll(): Observable<TotalReport[]> {
    console.log(baseUrl);
    return this.http.get<TotalReport[]>(`${baseUrl}/`);
  }
   
}
