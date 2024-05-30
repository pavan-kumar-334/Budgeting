import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './modules/shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private commonhttp: CommonService) { }

  getResourcelist(url: any): Observable<any> {
  
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `resource?${url}`,
      {}
    )
  }

  deleteResource(resourceId: string): Observable<any> {
    return this.commonhttp.delete(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'resource',
      `${resourceId}`,
      {}
    )

  }
  addResource(data: any): Observable<any> {
    return this.commonhttp.post(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `resource`,
      data
    )

  }

  getResourceDetailsById(resourceId: string): Observable<any> {
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'resource',
      `${resourceId}`,
      {}
    )
  }

  updateResourceDetails(data: any): Observable<any> {
    return this.commonhttp.put(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `resource`,
      data
    )
  }
  searchResource(url: any, data: any): Observable<any> {
    return this.commonhttp.post(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'resource',
      `searchCriteria?${url}`,
      data,
    )

  }

  roasterSearchCriteria(url:any, data: any): Observable<any> {
    return this.commonhttp.post(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'resource',
      `rosterSearch?${url}`,
      data,
    )

  }



}
