import { inject } from '@angular/core';
import {  CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

// export class adminGuard implements CanActivate {
//   constructor(
//     private _adminService : AdminService,
//     private _router : Router
//   ){}
//   canActivate():any{
//     if(!this._adminService.isAuthenticated(['admin'])){
//       this._router.navigate(['/login']);
//       return false;
//     }
//     return true;
//   }
  
// }

export const adminGuard: CanActivateFn = (route, state) => {
  const adminService = inject(AdminService);
  const router = inject(Router);

  if (!adminService.isAuthenticated(['admin'])) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
