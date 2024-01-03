// import { HttpInterceptorFn } from '@angular/common/http';

// export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };


import { Injectable } from "@angular/core";
import{
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
 
}
from '@angular/common/http';
import { Observable, catchError, throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class tokenInterceptor implements HttpInterceptor{
  constructor(private router:Router){}

  intercept(request:HttpRequest<unknown>,next:HttpHandler):Observable<HttpEvent<unknown>>
  {

    const token=localStorage.getItem('token');

    if(token){
      request=request.clone({
        setHeaders:{Authorization:`Bearer ${token}`}
      });
    }
    return next.handle(request).pipe(
      catchError((err)=>{
        if(err instanceof HttpErrorResponse){
          console.log(err.url);
          if(err.status===401|| err.status ===403){
            if(this.router.url==='/login'){
              //do nothing
            }
            else{
              localStorage.removeItem('token');
              this.router.navigate(['/']);
            }
          }
        }

        return throwError(err);
      })
    );
     
  }

}