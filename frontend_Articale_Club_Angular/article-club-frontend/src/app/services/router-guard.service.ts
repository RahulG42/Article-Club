import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterGuardService {

  constructor(public router:Router) { }

  canActivate():boolean{
    const token=localStorage.getItem('token');
    if(!token){
      this.router.navigate(['/'])
      return false;
    }
    else{
      return true;
    }
  }

  
}
