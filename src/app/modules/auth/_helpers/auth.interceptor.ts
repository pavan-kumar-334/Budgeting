import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { map, finalize } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
      //  const currentUser = JSON.parse(this.authService.currentUserValue);
      //  const isLoggedIn = currentUser && currentUser.token;
        const isLoggedIn = localStorage.getItem('token')!=null?localStorage.getItem('token'):''
           
       if (isLoggedIn) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer `+localStorage.getItem('token')
                }
            });
        }
    
        return next.handle(request).pipe (
            finalize( () => console.log("in"))
        );
    }
}
