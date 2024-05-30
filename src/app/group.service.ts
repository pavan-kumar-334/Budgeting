import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './modules/shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private commonhttp: CommonService) {}
  getGrouplist(url:any):  Observable<any> {
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `group${url}`,
      {}
    )
  }
  deleteGroup(id: string): Observable<any> {
    return this.commonhttp.delete(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'group',
      `${id}`,
      {}
    )
    
  }
  //getting result by id in search field.

  // SearchGroup(id: string): Observable<any> {
  //   return this.commonhttp.get(
  //     environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
  //     '',
  //     'group',
  //     `id=${id}`,
  //     {}
  //   )

  SearchGroup(url:any): Observable<any> {
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'group',
      `searchcriteria/name=${url}`,
      {}
    )
    
  }
  
  addGroup(data: any): Observable<any> {
    return this.commonhttp.post(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `group`,
      data
    )

    
    
  }
  
  getGroupDetails(id:any): Observable<any> {
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'group',
      `id=${id}`,
      {}
    )
  }

  updateGroup(data: any): Observable<any> {
    return this.commonhttp.put(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `group`,
      data
    )
  }
  

    
   
}
