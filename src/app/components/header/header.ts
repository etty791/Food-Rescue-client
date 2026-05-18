import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(private _authService: AuthService, private _router: Router) {}
  logout() {
    localStorage.removeItem('token');
    this._authService.currentUser.set(null);
    this._router.navigate(['/login']);
  }
}
