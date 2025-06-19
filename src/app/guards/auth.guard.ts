import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('userData');

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        if (parsedUser && parsedUser.email) {
          return true;
        }
      } catch {
        console.warn('Invalid user JSON');
      }
    }

    return this.router.createUrlTree(['/login']);
  }
}
