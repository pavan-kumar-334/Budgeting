import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './modules/shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class CostCenterService {

  constructor(private commonhttp: CommonService) { }

  getCostCenterlist(url:any):  Observable<any> {
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `costcentre?${url}`,
      {}
    )
  }
  addCostCenter(data:any):  Observable<any> {
    return this.commonhttp.post(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `costcentre`,
      data
    )
  }
  deleteCostCenter(costcentreID:string):Observable<any>{
    return this.commonhttp.delete(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'costcentre',
      `${costcentreID}`,
      {}
    )
  }
  SearchCostcenter(url:any, data:any): Observable<any> {
    return this.commonhttp.post(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'costcentre',
      `searchCriteria?${url}`,
      data
    )
   // costcentre/searchCriteria

  }
  getCostcenterDetails(costcentreID:any): Observable<any> {
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'costcentre',
      `${costcentreID}`,
      {}
    )
  }
  updateCostCenter(data: any):Observable<any>{
    return this.commonhttp.put(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `costcentre`,
      data
    )
  }
}
