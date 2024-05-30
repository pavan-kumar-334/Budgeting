import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './modules/shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class ProfitCenterService {
  

  constructor(private commonhttp: CommonService) { }

  getCountrylist():Observable<any>{
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `country/country/all`,
      {}
    )
  }

  getCompanylist(url:any):Observable<any>{
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `company?${url}`,
      {}
    )
  }

  getProfitCenterlist(url:any): Observable<any> {
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `profitCentre?${url}`,
      {}
    )
  }

  deleteProfitCenter(profitcentreId: string): Observable<any> {
    return this.commonhttp.delete(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'profitCentre',
      `${profitcentreId}`,
      {}
    )
    
  }

  addProfitCenter(data: any): Observable<any> {
    return this.commonhttp.post(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `profitCentre`,
      data
    )

    
    
  }

  updateProfitCenter(data: any): Observable<any> {
    return this.commonhttp.put(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `profitCentre`,
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
    //profitCentre/searchCriteria
    
  }


  getprofitCenterdetailsById(profitcentreId:string):Observable<any>{
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'profitCentre',
      `${profitcentreId}`,
      {}
    )
  }
}


