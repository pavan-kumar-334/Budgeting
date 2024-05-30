import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './modules/shared/services/common.service';


@Injectable({
  providedIn: 'root'
})
export class CostElementService {

  constructor(private commonhttp: CommonService,) { }


  getCostElementList(url:any): Observable<any> {
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `costElement${url}`,
      {}
    )
  }
  deleteCostElementById(id:string):Observable<any>{
    return this.commonhttp.delete(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'costElement',
      `${id}`,
      {}
    )
  }

  addCostElement(data: any): Observable<any> {
    return this.commonhttp.post(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `costElement`,
      data
    )
  }

  getCostElementdetailsById(id:string):Observable<any>{
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'costElement',
      `${id}`,
      {}
    )
  } 

  updateCostElementData(data: any): Observable<any> {
    return this.commonhttp.put(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `costElement`,
      data
    )

  }

  searchCostElement(url:any,data: any): Observable<any> {
    return this.commonhttp.post(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'costElement',
      `search-criteria?${url}`,
      data,
    )
    
  }

}
