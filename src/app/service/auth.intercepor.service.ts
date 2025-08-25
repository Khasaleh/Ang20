import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, Observable, of, take, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenStorageService } from './TokenStorgeService.service';
import { Router } from '@angular/router';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor{

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  message: any;

  accessToken$: Observable<string> = new Observable<string>()
  refreshToken$: Observable<string> = new Observable<string>()

  constructor(private tokenService: TokenStorageService,private router: Router,
    private authService: AuthService) {}


    intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.refreshToken$ =  of(this.tokenService.getRefreshToken())
      this.accessToken$ =  of(this.tokenService.getToken()!)
      return this.accessToken$.pipe(
        take(1),
        concatMap(accessToken => {
          try{
          console.log(req?.body?.get('query')!=undefined?req?.body?.get('query'):req.url)
          } catch(errr) {
            console.log(errr)
          }
          if (accessToken) {
            return next.handle(req.clone({
              setHeaders: { Authorization: `Bearer ${accessToken}` }
            }))
          }
          return next.handle(req.clone())
        }),
        concatMap(event => {
          let needToAuthenticate = false
          if (
            event.type === HttpEventType.Response &&
            event.status === 200 &&
            event.body &&
            Array.isArray(event.body.errors)
          ) {
            const errors = event.body.errors as any[]
            console.log('ai52-onErrorEvent: ', event.body)
            if(event?.body?.errors[0]?.errorCode === 'STORE_NOT_FOUND'){
              this.router.navigateByUrl('domain-not-exist');
            }
            needToAuthenticate = !!errors.find(e => e && e.errorCode === 'ACCESS_DENIED_EXCEPTION')
          }

          if (needToAuthenticate) {
            return this.refreshToken$.pipe(
              take(1),
            concatMap(async refreshToken =>
              (await this.authService.refreshToken(refreshToken)).pipe(
              tap(e=>{
                if(e.data){
                  let token1 = e?.data?.refreshToken
                  let act = token1.accessToken
                  this.isRefreshing = false;
                  this.tokenService.saveToken(token1.accessToken);
                  this.tokenService.saveRefreshToken(token1.refreshToken);
                  this.refreshTokenSubject.next(token1.accessToken);
                  this.accessToken$ =  of(act)
                } else{
                  console.log('ai71-refreshTokenAPI res: ',e)
                }
              }))),
              concatMap(() => this.accessToken$.pipe(take(1))),
              concatMap(accessToken => {
                console.log('ai76-accessToken: ',accessToken)
                if (accessToken) {
                  return next.handle(req.clone({
                    setHeaders: { Authorization: `Bearer ${accessToken}` }
                  }))
                } else {
                  throw new Error('Error getting access token after logging in with refresh token')
                }
              })
            )
          }
          return of(event)
        })
      )
    }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
  }

  logout(): void {
    const token = this.tokenService.getRefreshToken();
    this.authService.logout(token).subscribe(response => {
      this.tokenService.signOut();

    }, (err) => {
      this.message = err.errors[0].errorMessage;
    });
  }

}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
