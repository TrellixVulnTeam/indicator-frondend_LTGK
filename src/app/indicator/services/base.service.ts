import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from 'src/app/_services/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  protected token = "";

  constructor(protected UserAuthService: UserAuthService, protected http: HttpClient) {
    this.token = this.UserAuthService.getToken()
  }

  get getHeaders(): HttpHeaders {
    return new HttpHeaders(
      {
        authorization: 'Bearer' + this.token,
      }
    )
  }


}

