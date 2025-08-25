import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './TokenStorgeService.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  {

  constructor(
    private router: Router,
    // private authenticationService: AuthService,
    private tokenStorage: TokenStorageService
) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     const currentUser = this.tokenStorage.getUser();
    if(currentUser && currentUser.activated===false){
      this.router.navigate(['/deactivateaccount/' + currentUser.id]);
      return false
    }else if(currentUser && currentUser.markedForDeleted===true){
      this.router.navigate(['/restoreaccount/' + currentUser.id]);
      return false
    }
    else if(currentUser){
      return true;
    }


    this.router.navigate(['']);
      return false;
  }

}
