import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './modules/shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class CostGroupService {

  constructor(private commonhttp: CommonService,) { }

  getCostGroupList(url:any): Observable<any> {
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `costGroup${url}`,
      {}
    )
  }

  deleteCostGroup(id:string):Observable<any>{
    return this.commonhttp.delete(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'costGroup',
      `${id}`,
      {}
    )
  }

  addCostGroup(data: any): Observable<any> {
    return this.commonhttp.post(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `costGroup`,
      data
    )
  }

  getCostGroupdetailsById(id:string):Observable<any>{
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'costGroup',
      `${id}`,
      {}
    )
  } 

  updateCostGroupData(data: any): Observable<any> {
    return this.commonhttp.put(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `costGroup`,
      data
    )

  }

  searchCostGroup(url:any,data: any): Observable<any> {
    return this.commonhttp.post(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'costGroup',
      `search-criteria?${url}`,
      data,
    )
    
  }
}

