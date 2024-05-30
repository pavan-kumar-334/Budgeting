import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';
import { CommonService } from '../../shared/services/common.service';


@Injectable({ providedIn: 'root' })

export class AuthService {
    constructor(
        private http: HttpClient,
        private commonhttp: CommonService,
        private router: Router,
    ) { }

    isUserLoggedIn(): boolean {
        if (localStorage.getItem('currentUser')) {
            return true;
        }
        return false;
    }
    public get currentUserValue(): any {
        return localStorage.getItem('currentUser');
    }

    login(data: any): any {
        return this.commonhttp.post(
            environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
            '',
            ``,
            '/authenticate/user',
            data
        ).pipe(map(user => {
            return this.processLogin(user);
        }));
    }

    private processLogin(user: any): any {
        if (user.error) {
            return user;
        } else {
            localStorage.setItem('currentUser', JSON.stringify(user.data[0]));
            return user;
        }
    }

    logout(): void {
        this.clearAll();
        this.router.navigate(['/login']);
    }
    clearAll(): void {
        localStorage.removeItem('currentUser');
    }


    signIn( data: any): Observable<any> {
        return this.commonhttp.post(
          environment.apiUrl + ':MICROSERVICE/api/:CHILD/',
          '',
          'auth',
          `signin`,
          data,
        )
    
      }
}
