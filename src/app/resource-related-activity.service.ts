import { Injectable } from '@angular/core';
import { CommonService } from './modules/shared/services/common.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourceRelatedActivityService {

  constructor(private commonhttp: CommonService) { } 



  // searchResourceRelatedActivityService(url:any,data: any): Observable<any> {
  //   return this.commonhttp.post(
  //     environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
  //     '',
  //     'profitCentre',
  //     `searchCriteria?${url}`,
  //     data,
  //   )
  //   //profitCentre/searchCriteria
    
  // }

  getPayRollActivityService(url:any): Observable<any> {
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'reports/payroll',
      `profitcentreId?${url}`,
      {}
    )
  }

  getResourceRelatedActivityService(url:any): Observable<any> {
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'reports',
      `profitcentreId?${url}`,
      {}
    )
  }
  getNonResourceRelatedActivityService(url:any): Observable<any> {
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'reports',
      `nonResourceReport?${url}`,
      {}
    )
  }
  getProfitCenterReport(url:any,type:any): Observable<any> {
    if(type != ''){
      return this.commonhttp.get(
        environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
        '',
        'reports',
        `drilldown/profitcentreId/others?${url}`,
        {}
      )
    } else {
      return this.commonhttp.get(
        environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
        '',
        'reports',
        `drilldown/profitcentreId/tandm?${url}`,
        {}
      )
    }
  }
}


