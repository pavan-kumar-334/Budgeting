import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { NEVER, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/_helpers/auth.service';
import { ConfirmedDialogServiceService } from 'src/app/confirmed-dialog-service.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor
{
    constructor(
        private authService: AuthService,
        private confirmDialogService: ConfirmedDialogServiceService
    )
    {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        return next.handle(request).pipe(catchError(err => {
            if ( [401, 403].indexOf(err.status) !== -1 )
            {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                this.authService.logout();
                return NEVER;
            } else if (err.status ==0){
                //this.confirmDialogService.openErrorDialog('Unable to Connect', 'Unable to connect to server. Please try after some time!');
                return NEVER;
            }
            else
            {
                const error = err.error.errors[0].message || err.statusText;
                return throwError(err);
            }
        }));
    }
}
