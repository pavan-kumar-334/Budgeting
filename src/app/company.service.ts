import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './modules/shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private commonhttp: CommonService) {}

  
  getcompanylist(url:any): Observable<any> {
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `company${url}`,
      {}
    )
  }
  deleteCompany(id:string): Observable<any> {
    return this.commonhttp.delete(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'company',
      `${id}`,
      {}
    )
  }
  addCompany(data: any): Observable<any> {
    return this.commonhttp.post(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `company`,
      data
    )
  }
  getCountrylist():Observable<any>{
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `country/country/all`,
      {}
    )
  }

  getGrouplist():Observable<any>{
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `group`,
      {}
    )
  }
  searchCompany(url:any,data: any): Observable<any> {
    return this.commonhttp.post(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'company',
      `search-criteria?${url}`,
      data,
    )
    
  }
  getcompanydetails(id:string):Observable<any>{
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'company',
      `${id}`,
      {}
    )
  }
  
  updateCompany(data: any):Observable<any>{
    return this.commonhttp.put(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `company`,
      data
    )
  }
}
