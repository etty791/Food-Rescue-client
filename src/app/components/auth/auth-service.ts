import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  currentUser = signal<any | null>(null);

  constructor(private _httpClient: HttpClient) {
    this.loadUserFromToken();
  }

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

  loadUserFromToken() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          this.currentUser.set(decoded);
          console.log('User loaded from token:', decoded);
        } catch (error) {
          console.error('Error decoding token', error);
          this.currentUser.set(null);
        }
      }
    }
  }
}
