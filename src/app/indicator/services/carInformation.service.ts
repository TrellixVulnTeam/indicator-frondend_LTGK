import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { BaseService } from './base.service';
import { CarInformation } from '../models/common/carInformation.model';
import { Observable } from 'rxjs';

const url = `${environment.apiUrl}/api/carInformation/`
@Injectable({
    providedIn: 'root'
})
export class CarInformationService extends BaseService {

    constructor(userAuthService: UserAuthService, httpClient: HttpClient) {
        super(userAuthService, httpClient)
    }

    create(carInformation: CarInformation): Observable<any> {
        return this.http.post(url + "create", carInformation, { headers: this.getHeaders });
    }

    edit(carInformation: CarInformation): Observable<any> {
        return this.http.post(url + "edit", carInformation, { headers: this.getHeaders });
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
