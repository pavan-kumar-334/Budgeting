import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './modules/shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private commonhttp:CommonService,) { }

  getProjectlist(url:any): Observable<any> {
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `project?${url}`,
      {}
    )
  }


  deleteProject(projectId: string): Observable<any> {
    return this.commonhttp.delete(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'project',
      `${projectId}`,
      {}
    )
    
  }
  updateProject(data: any): Observable<any> {
    return this.commonhttp.put(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `project`,
      data
    )
  }
  getprojectdetailsById(projectId:string):Observable<any>{
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'project',
      `${projectId}`,
      {}
    )
  }
  addProject(data: any): Observable<any> {
    return this.commonhttp.post(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `project`,
      data
    )

  }
  searchProject(url:any,data: any): Observable<any> {
    return this.commonhttp.post(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'project',
      `searchCriteria?${url}`,
      data,
    )
    
  }
  getProjectTypes(): Observable<any> {
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `project/getTypes`,
      {},
    )
  }

}
