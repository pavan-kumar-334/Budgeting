import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './modules/shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private commonhttp: CommonService) { }

  getCustomerslist(url:any): Observable<any> {
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `customer${url}`,
      {}
    )
  }

  deleteCustomer(customerId:string):Observable<any>{
    return this.commonhttp.delete(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'customer',
      `${customerId}`,
      {}
    )
  }

  addCustomer(data: any): Observable<any> {
    return this.commonhttp.post(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `customer`,
      data
    )
  }

  getCustomerdetailsById(customerId:string):Observable<any>{
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'customer',
      `${customerId}`,
      {}
    )
  }

  updateCustomerData(data: any): Observable<any> {
    return this.commonhttp.put(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `customer`,
      data
    )

  }
  searchProfitCenter(url:any,data: any): Observable<any> {
    return this.commonhttp.post(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'profitCentre',
      `searchCriteria?${url}`,
      data,
    )
    //customer/searchCriteria
    
  }

  searchCustomer(url:any,data: any): Observable<any> {
    return this.commonhttp.post(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'customer',
      `searchCriteria?${url}`,
      data,
    )
    //profitCentre/searchCriteria
    
  }
}
