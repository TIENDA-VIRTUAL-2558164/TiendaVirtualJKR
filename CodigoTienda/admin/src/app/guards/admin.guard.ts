import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';


@Injectable({
  providedIn: 'root'
})
export class adminGuard implements CanActivate {
  constructor(
    private _adminService : AdminService,
    private _router : Router
  ){}
  canActivate():any{
    if(!this._adminService.isAuthenticated(['admin'])){
      this._router.navigate(['/login']);
      return false;
    }
    return true;
  }
  
}
