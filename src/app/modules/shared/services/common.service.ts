import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  RETRY_SERVICE_COUNT: any = 0;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {

  }

  // @method get
  // @params HttpParams if needed
  // @path Request URL
  get(path: any, MICRO: any, CHILD: any, finalPath: any, requestOptions: any): Observable<any> {
    path = this.getRealPath(path, MICRO, CHILD);
    return this.http.get(path + finalPath, requestOptions).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        return this.errorHandler(err);
      }), // Catch Errors if service fails
      retry(this.RETRY_SERVICE_COUNT) // if you want to retry the request. Please mention the retry count value
    );
  }
  // Utility method for Create.
  // @method post
  // @param path
  // @param body
  put(path: string, MICRO: string, CHILD: string, finalPath: any, body = {}): Observable<any> {
    path = this.getRealPath(path, MICRO, CHILD);
    return this.http.put(
      path + finalPath, body).pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return this.errorHandler(err);
        })
      );
  }
  // Utility method for Create.
  // @method post
  // @param path
  // @param body
  post(path: string, MICRO: string, CHILD: string, finalPath: string, body = {}): Observable<any> {
    path = this.getRealPath(path + finalPath, MICRO, CHILD);
    return this.http.post(
      path, body).pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return this.errorHandler(err);
        })
      );
  }


  // Utility method for Create.
  // @method patch
  // @param path
  // @param body
  // @param customHeaders
  patch(path: string, body = {}, requestOptions: any): Observable<any> {
    return this.http.patch(
      path, body, requestOptions).pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return this.errorHandler(err);
        })
      );
  }

  // Utility method for Create.
  // @method delete
  // @param path
  // @param customHeaders
  delete(path: string, MICRO: string, CHILD: string, finalPath: string, requestOptions: any): Observable<any> {
    path = this.getRealPath(path + finalPath, MICRO, CHILD);
    return this.http.delete(
      path, requestOptions).pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return this.errorHandler(err);
        })
      );
  }

  // Please add errors and error codes in errors.json.ts file
  private errorHandler(error: HttpErrorResponse) {
    // To know weather the error is from Client or server error
    if (error.error instanceof ErrorEvent) {
      //console.log('Client side error. Please check the request and body');
    } else {
      //console.log('Server Error. Please check the error from server side');
    }
    // get's error message from errors.json.ts
    // let errorMessage = error.error['default'].message;
    // if (error.error.hasOwnProperty(error.status)) {
    //   errorMessage = error.error[error.status].message;
    // }
    //console.log(error);
    if (error.status == 401) {      
      this.router.navigate(['/login']);
    }    
    return throwError(error);
  }

  private getRealPath(path: string, MICRO: any, CHILD: any) {
    path = path.replace(/:MICROSERVICE/g, MICRO);
    path = path.replace(/:CHILD/g, CHILD);

    path = path.replace(/([^:]\/)\/+/g, "$1");
    return path;
  }
}
