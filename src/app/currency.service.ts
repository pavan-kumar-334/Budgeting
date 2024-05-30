import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './modules/shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private commonhttp: CommonService) { }
  getCurrency(url:any): Observable<any> {
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `currency/findAll${url}`,
      {}
    )
  }
  addCurrency(data: any): Observable<any> {
    return this.commonhttp.post(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `currency`,
      data
    )
  }
  getCurrencyById(id:string):Observable<any>{
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'currency',
      `${id}`,
      {}
    )
  }
}
