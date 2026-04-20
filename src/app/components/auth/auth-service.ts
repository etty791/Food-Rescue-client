import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _httpClient: HttpClient) {}

  login(userName: string, password: string): Observable< string > {
    return this._httpClient.post('https://localhost:7055/api/Auth/login', { userName, password },{ responseType: 'text' });
  }
  signup(userData: any): Observable<any> {
    if (userData.role === 'business') {
      return this._httpClient.post('https://localhost:7055/api/Auth/register/business', userData);
    } else {
      return this._httpClient.post('https://localhost:7055/api/Auth/register/charity', userData);
    }
  }
}
